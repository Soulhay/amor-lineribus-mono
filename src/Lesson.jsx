import React from 'react';

/**
 * React reimplementation of the screen served by the Angular remote in the
 * micro-frontend version. Same markup, same tokens, same content.
 */
export default function Lesson() {
  return (
    <section className="lesson">
      <p className="lesson__eyebrow">LESSON 6 OF 12</p>
      <h2 className="lesson__title">Components &amp; props</h2>
      <p className="lesson__lead">
        Components let you split the UI into independent, reusable pieces.
        Props pass data into them so the same component can render different
        content.
      </p>

      <div className="lesson__meta">
        <span>~15 min</span>
        <span>Beginner</span>
        <span className="lesson__xp">+40 XP</span>
      </div>
    </section>
  );
}