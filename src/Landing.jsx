import React from 'react';

export default function Landing() {
  return (
    <section className="landing">
      <p className="landing__eyebrow">MULTI-FRAMEWORK &middot; ONE PLATFORM</p>
      <h1 className="landing__title">Learn to build the modern web.</h1>
      <p className="landing__lead">
        Master React, Angular, and Vue through hands-on, project-based courses.
        One curriculum, every framework.
      </p>

      <div className="landing__frameworks">
        <article className="fw-card fw-card--react"><span>Re</span>React</article>
        <article className="fw-card fw-card--angular"><span>Ng</span>Angular</article>
        <article className="fw-card fw-card--vue"><span>Vu</span>Vue</article>
      </div>
    </section>
  );
}