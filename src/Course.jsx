import React, { useState } from 'react';

/**
 * Course overview — React reimplementation of the screen served by the Vue
 * remote in the micro-frontend version.
 *
 * Same content, same stylesheet, same interaction: four sidebar tabs, a
 * progress panel, module lists with done / current / locked states.
 *
 * The one deliberate difference is navigation. In the micro-frontend
 * version the Resume control cannot reach the shell's router, so it
 * announces intent on a custom DOM event. Here the screen and the router
 * live in the same application, so it navigates directly. That difference
 * is itself a finding: crossing a deployment boundary costs an indirection
 * that a single application does not need.
 */

const TABS = [
  { id: 'overview', label: 'Overview', icon: '▤' },
  { id: 'lessons', label: 'Lessons', icon: '≡' },
  { id: 'syllabus', label: 'Syllabus', icon: '◫' },
  { id: 'resources', label: 'Resources', icon: '⚑' },
];

const COURSE = {
  framework: 'React',
  level: 'Beginner',
  title: 'Intro to React',
  tagline: 'Build UIs from components up',
  progress: 42,
  streak: 6,
  totalLessons: 12,
  description:
    'A hands-on introduction to building interfaces with React. Start from ' +
    'components and props, then work up to state and effects through short, ' +
    'practical lessons.',
  outcomes: [
    'Build components with JSX',
    'Pass and read props',
    'Manage state with hooks',
    'Handle events & forms',
  ],
  modules: [
    {
      name: 'Module 1 · Fundamentals',
      lessons: [
        { id: 1, title: 'What is React?', done: true, minutes: 8 },
        { id: 2, title: 'Your first component', done: true, minutes: 12 },
        { id: 3, title: 'JSX in depth', done: true, minutes: 10 },
        { id: 4, title: 'Rendering lists', done: true, minutes: 9 },
        { id: 5, title: 'Conditional rendering', done: true, minutes: 11 },
      ],
    },
    {
      name: 'Module 2 · Components & props',
      lessons: [
        { id: 6, title: 'Components & props', current: true, minutes: 15 },
        { id: 7, title: 'Composition patterns', minutes: 14 },
        { id: 8, title: 'Prop types & defaults', minutes: 10 },
      ],
    },
    {
      name: 'Module 3 · State & effects',
      lessons: [
        { id: 9, title: 'useState', minutes: 13 },
        { id: 10, title: 'useEffect', minutes: 16 },
        { id: 11, title: 'Handling events', minutes: 11 },
        { id: 12, title: 'Forms & inputs', minutes: 14 },
      ],
    },
  ],
  syllabus: [
    { topic: 'Components', where: 'Applied in the course card and lesson layout' },
    { topic: 'Props', where: 'Applied throughout the dashboard grid' },
    { topic: 'State', where: 'Applied in the lesson task list' },
    { topic: 'Effects', where: 'Applied when loading course data' },
    { topic: 'Events', where: 'Applied in every interactive control' },
  ],
  resources: [
    { kind: 'Docs', title: 'React reference — components and props' },
    { kind: 'Cheatsheet', title: 'JSX syntax quick reference' },
    { kind: 'Exercise', title: 'Build a Badge component from scratch' },
    { kind: 'Reading', title: 'Thinking in components' },
  ],
};

const mark = (l) => (l.done ? '✓' : l.current ? '◐' : '○');

const rowClass = (l) =>
  ['lrow', l.done ? 'lrow--done' : '', l.current ? 'lrow--current' : '']
    .join(' ')
    .trim();

export default function Course({ onResume }) {
  const [activeTab, setActiveTab] = useState('overview');

  const allLessons = COURSE.modules.flatMap((m) => m.lessons);
  const completedLessons = allLessons.filter((l) => l.done).length;

  const currentModule =
    COURSE.modules.find((m) => m.lessons.some((l) => l.current)) ||
    COURSE.modules[0];
  const moduleDoneCount = currentModule.lessons.filter((l) => l.done).length;

  const resume = () => {
    if (onResume) onResume();
  };

  return (
    <div className="course">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="csidebar">
        <article className="ccard">
          <div className="ccard__cover">
            <span className="ccard__cover-tag">{COURSE.framework}</span>
          </div>
          <div className="ccard__body">
            <h1 className="ccard__title">{COURSE.title}</h1>
            <p className="ccard__tagline">{COURSE.tagline}</p>
          </div>
        </article>

        <section className="cprogress">
          <p className="cprogress__label">Your progress</p>
          <p className="cprogress__value">
            {COURSE.progress}
            <span className="cprogress__unit">% done</span>
          </p>

          <div
            className="progressbar"
            role="progressbar"
            aria-valuenow={COURSE.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span
              className="progressbar__fill"
              style={{ width: `${COURSE.progress}%` }}
            />
          </div>

          <dl className="cprogress__meta">
            <div className="cprogress__row">
              <dt>
                <span className="cprogress__flame" aria-hidden="true">▲</span> Streak
              </dt>
              <dd>{COURSE.streak} days</dd>
            </div>
            <div className="cprogress__row">
              <dt>Lessons</dt>
              <dd>{completedLessons} / {COURSE.totalLessons}</dd>
            </div>
          </dl>
        </section>

        <nav className="ctabs" aria-label="Course sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`ctabs__item${activeTab === tab.id ? ' is-active' : ''}`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="ctabs__icon" aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <main className="cmain">
        <header className="cmain__head">
          <p className="cmain__chips">
            <span className="tag tag--react">{COURSE.framework}</span>
            <span className="cmain__chip">{COURSE.level}</span>
            <span className="cmain__chip">{COURSE.totalLessons} lessons</span>
          </p>

          <button className="btn btn--primary" type="button" onClick={resume}>
            Continue <span aria-hidden="true">→</span>
          </button>
        </header>

        {activeTab === 'overview' && (
          <section className="panel">
            <h2 className="panel__title">Course overview</h2>
            <p className="panel__lead">{COURSE.description}</p>

            <div className="outcomes">
              <div className="outcomes__head">
                <h3 className="outcomes__title">What you&rsquo;ll learn</h3>
                <span className="outcomes__count">
                  {COURSE.outcomes.length} outcomes
                </span>
              </div>
              <ul className="outcomes__list">
                {COURSE.outcomes.map((o) => (
                  <li className="outcomes__item" key={o}>
                    <span className="outcomes__check" aria-hidden="true">✓</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modules">
              <div className="modules__head">
                <h3 className="modules__title">{currentModule.name}</h3>
                <span className="modules__count">
                  {moduleDoneCount} / {currentModule.lessons.length}
                </span>
              </div>

              <ul className="modules__list">
                {currentModule.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <div className={rowClass(lesson)}>
                      <span className="lrow__mark" aria-hidden="true">
                        {mark(lesson)}
                      </span>
                      <span className="lrow__title">{lesson.title}</span>

                      {lesson.done && <span className="lrow__state">Done</span>}
                      {lesson.current && (
                        <button
                          className="btn btn--warm btn--sm"
                          type="button"
                          onClick={resume}
                        >
                          Resume
                        </button>
                      )}
                      {!lesson.done && !lesson.current && (
                        <span className="lrow__state lrow__state--locked">
                          Locked
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'lessons' && (
          <section className="panel">
            <h2 className="panel__title">All lessons</h2>
            <p className="panel__lead">Every lesson in this course, in order.</p>

            {COURSE.modules.map((mod) => (
              <div className="modules" key={mod.name}>
                <div className="modules__head">
                  <h3 className="modules__title">{mod.name}</h3>
                  <span className="modules__count">
                    {mod.lessons.length} lessons
                  </span>
                </div>
                <ul className="modules__list">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <div className={rowClass(lesson)}>
                        <span className="lrow__mark" aria-hidden="true">
                          {mark(lesson)}
                        </span>
                        <span className="lrow__title">{lesson.title}</span>
                        <span className="lrow__state">{lesson.minutes} min</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'syllabus' && (
          <section className="panel">
            <h2 className="panel__title">Syllabus</h2>
            <p className="panel__lead">
              The concepts this course covers, and where each one is applied.
            </p>
            <ul className="syllabus">
              {COURSE.syllabus.map((item, i) => (
                <li className="syllabus__item" key={item.topic}>
                  <span className="syllabus__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="syllabus__topic">{item.topic}</p>
                    <p className="syllabus__where">{item.where}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeTab === 'resources' && (
          <section className="panel">
            <h2 className="panel__title">Resources</h2>
            <p className="panel__lead">
              Reference material to use alongside the lessons.
            </p>
            <ul className="reslist">
              {COURSE.resources.map((r) => (
                <li className="reslist__item" key={r.title}>
                  <span className="reslist__kind">{r.kind}</span>
                  <span className="reslist__title">{r.title}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="origin">
          Monolithic reference &middot; single bundle, no federation
        </p>
      </main>
    </div>
  );
}