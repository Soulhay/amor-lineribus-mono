import React, { useEffect, useRef } from 'react';

/**
 * Framework-agnostic host for a federated remote.
 *
 * DOM ownership matters here. React considers the element it renders to be
 * its own, but a remote's teardown may remove its host element - Angular's
 * destroy() does exactly that. If the remote is given the React-rendered
 * node, both sides try to remove the same element and React throws
 * "Node.removeChild: The node to be removed is not a child of this node".
 *
 * So React renders an outer element and never lets a remote near it. This
 * component then creates an inner container imperatively and hands that to
 * the remote. React does not know the inner container exists; the remote is
 * free to destroy it. On cleanup we remove it ourselves if it is still
 * attached.
 *
 * Every remote implements the same contract:
 *   mount(element)  - bootstrap into the given element
 *   unmount()       - tear down again
 */
export default function RemoteMount({ load }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    // The remote owns this element, not React.
    const container = document.createElement('div');
    host.appendChild(container);

    let mod;
    let cancelled = false;

    load()
      .then((m) => {
        if (cancelled) return;
        mod = m;
        m.mount(container);
      })
      .catch((err) => {
        console.error('Failed to load remote:', err);
      });

    return () => {
      cancelled = true;

      // A remote failing to tear down cleanly must not prevent the shell
      // from navigating, so the teardown is isolated.
      try {
        mod?.unmount?.(container);
      } catch (err) {
        console.error('Remote failed to unmount cleanly:', err);
      }

      // The remote may already have removed the container itself.
      if (container.parentNode === host) {
        host.removeChild(container);
      }
    };
  }, [load]);

  return <div ref={hostRef} />;
}