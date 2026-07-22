import React, { useState } from 'react';

/**
 * React reimplementation of the screen served by the Vue remote in the
 * micro-frontend version. Same markup, same tokens, same behaviour.
 */
export default function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <section className="panel">
      <h2 className="panel__title">Dashboard</h2>
      <p className="panel__lead">Your progress across every course.</p>
      <button className="panel__button" onClick={() => setCount(count + 1)}>
        clicked {count} times
      </button>
    </section>
  );
}