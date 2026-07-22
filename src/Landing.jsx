import React from 'react';

/**
 * Landing page — owned by the shell itself, no remote involved.
 *
 * This is the only feature screen the host renders directly. The shell
 * therefore owns the chrome (nav, footer, routing) plus one screen, while
 * each remote owns a feature area. Identical file in the monolithic
 * reference implementation, so the comparison holds.
 */

const FRAMEWORKS = [
  { key: 'react', short: 'Re', name: 'React', role: 'Shell / host' },
  { key: 'angular', short: 'Ng', name: 'Angular', role: 'Lesson remote' },
  { key: 'vue', short: 'Vu', name: 'Vue', role: 'Course remote' },
];

const STATS = [
  { value: '120+', label: 'Lessons' },
  { value: '3', label: 'Frameworks' },
  { value: '8.4k', label: 'Learners' },
];

const TOPICS_TOP = [
  'React', 'Signals', 'Routing', 'SSR', 'Stores',
  'Hooks', 'State', 'Testing', 'Reactivity', 'Vue',
];

const TOPICS_BOTTOM = [
  'Props', 'Effects', 'API', 'Deploy', 'Bundlers',
  'Composition', 'Forms', 'Auth', 'CLI', 'CSS',
];

const FEATURES = [
  {
    icon: '◈',
    title: 'One curriculum',
    body: 'Learn each concept once, then see it applied across React, Angular, and Vue.',
  },
  {
    icon: '</>',
    title: 'Hands-on projects',
    body: 'Build real apps in an in-browser editor with instant feedback on every step.',
  },
  {
    icon: '◹',
    title: 'Track progress',
    body: 'Visual progress bars and completion badges keep your learning on pace.',
  },
  {
    icon: '◆',
    title: 'Career paths',
    body: 'Guided tracks take you from fundamentals to production-ready fluency.',
  },
];

const COURSES = [
  {
    tag: 'React', tagKey: 'react', level: 'Beginner',
    title: 'Intro to React',
    body: 'Components, props, and state from the ground up.',
    lessons: 18, hours: '4h', rating: '4.9',
  },
  {
    tag: 'Angular', tagKey: 'angular', level: 'Intermediate',
    title: 'Angular Essentials',
    body: 'Modules, services, and dependency injection.',
    lessons: 22, hours: '6h', rating: '4.7',
  },
  {
    tag: 'Vue', tagKey: 'vue', level: 'Beginner',
    title: 'Vue Fundamentals',
    body: 'Reactivity and the composition API explained.',
    lessons: 16, hours: '3.5h', rating: '4.8',
  },
  {
    tag: 'Tooling', tagKey: 'neutral', level: 'Intermediate',
    title: 'Build Tooling',
    body: 'Bundlers, module federation, and modern build pipelines.',
    lessons: 14, hours: '3h', rating: '4.6',
  },
  {
    tag: 'Git', tagKey: 'neutral', level: 'Beginner',
    title: 'Version Control',
    body: 'Branching, merging, and collaboration workflows.',
    lessons: 12, hours: '2.5h', rating: '4.8',
  },
  {
    tag: 'TypeScript', tagKey: 'neutral', level: 'Intermediate',
    title: 'TypeScript Deep Dive',
    body: 'Types, generics, and safer JavaScript at scale.',
    lessons: 20, hours: '5h', rating: '4.9',
  },
];

function TopicBand({ topics, label }) {
  return (
    <section className="band" aria-hidden="true">
      <p className="band__label">{label}</p>
      <ul className="band__pills">
        {topics.map((t, i) => (
          <li key={t} className="band__pill" data-offset={i % 4}>
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Landing() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--pill">Multi-framework · one platform</p>

            <h1 className="hero__title">
              Learn to<br />build the<br />modern web.
            </h1>

            <p className="hero__lead">
              Master React, Angular, and Vue through hands-on, project-based
              courses. One curriculum, every framework — so you learn the
              concepts that carry across all of them.
            </p>

            <div className="hero__actions">
              <button className="btn btn--primary" type="button">
                Start learning free
              </button>
              <button className="btn btn--outline" type="button">
                Browse courses
              </button>
            </div>

            <dl className="stats">
              {STATS.map((s) => (
                <div className="stats__item" key={s.label}>
                  <dt className="stats__value">{s.value}</dt>
                  <dd className="stats__label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero__grid">
            {FRAMEWORKS.map((f) => (
              <article className={`fw-card fw-card--${f.key}`} key={f.key}>
                <span className="fw-card__badge">{f.short}</span>
                <h2 className="fw-card__name">{f.name}</h2>
                <p className="fw-card__role">{f.role}</p>
              </article>
            ))}

            {/* The control group is part of the story, not hidden away. */}
            <article className="fw-card fw-card--mono">
              <span className="fw-card__badge">Mo</span>
              <h2 className="fw-card__name">Monolith</h2>
              <p className="fw-card__role">Reference build</p>
            </article>
          </div>
        </div>
      </section>

      <TopicBand topics={TOPICS_TOP} label="100+ topics across three frameworks" />

      {/* ── Why ────────────────────────────────────────────── */}
      <section className="section section--centered">
        <p className="eyebrow">Why Amor Lineribus</p>
        <h2 className="section__title">Concepts first, syntax second.</h2>
        <p className="section__lead">
          Every course teaches the underlying idea, then shows you how it looks
          across each framework.
        </p>

        <div className="features">
          {FEATURES.map((f) => (
            <article className="feature" key={f.title}>
              <span className="feature__icon" aria-hidden="true">{f.icon}</span>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__body">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Popular ────────────────────────────────────────── */}
      <section className="section section--tinted">
        <header className="section__head">
          <div>
            <p className="eyebrow eyebrow--warm">Most popular</p>
            <h2 className="section__title section__title--left">
              Courses learners love
            </h2>
          </div>
          <a className="link-arrow" href="#courses">
            View all courses <span aria-hidden="true">→</span>
          </a>
        </header>

        <div className="courses">
          {COURSES.map((c) => (
            <article className="course" key={c.title}>
              <div className="course__cover" aria-hidden="true">
                <span className="course__cover-mark">{'{ }'}</span>
              </div>
              <div className="course__body">
                <p className="course__meta">
                  <span className={`tag tag--${c.tagKey}`}>{c.tag}</span>
                  <span className="course__level">{c.level}</span>
                </p>
                <h3 className="course__title">{c.title}</h3>
                <p className="course__desc">{c.body}</p>
              </div>
              <footer className="course__foot">
                <span>{c.lessons} lessons · {c.hours}</span>
                <span className="course__rating">★ {c.rating}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <TopicBand topics={TOPICS_BOTTOM} label="Learn once, apply everywhere" />

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="section">
        <div className="cta">
          <h2 className="cta__title">
            Start your first course<br />today — it&rsquo;s free.
          </h2>
          <p className="cta__lead">Join 8,400 learners. No credit card required.</p>

          <div className="cta__form">
            <label className="sr-only" htmlFor="cta-email">Email address</label>
            <input
              id="cta-email"
              className="cta__input"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            <button className="btn btn--warm" type="button">Get started</button>
          </div>
        </div>
      </section>
    </>
  );
}

import React from 'react';

/**
 * Placeholder. The course overview is built next in the Vue remote; this
 * file gets its React counterpart at the same time so the two
 * implementations stay functionally equivalent.
 */
export default function Course() {
  return (
    <section className="section">
      <p className="eyebrow">Course overview</p>
      <h2 className="section__title section__title--left">Coming next</h2>
      <p className="section__lead">
        This screen is implemented in the Vue remote in the micro-frontend
        version and will be mirrored here.
      </p>
    </section>
  );
}