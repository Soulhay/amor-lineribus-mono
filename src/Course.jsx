import React, { useState } from 'react';

/**
 * Lesson view — React reimplementation of the screen served by the Angular
 * remote in the micro-frontend version.
 *
 * Functional equivalence is the point. Same content, same tokens, same
 * interaction: three tasks, completion gating, the same brief accordion on
 * mobile. If the two implementations diverge in what they do, the payload
 * and performance comparisons stop measuring architecture and start
 * measuring scope.
 */

const LESSON = {
  number: 6,
  total: 12,
  title: 'Components & props',
  brief:
    'Components let you split the UI into independent, reusable pieces. ' +
    'Props pass data into them so the same component can render different content.',
  duration: '~15 min',
  level: 'Beginner',
  xp: 40,
  courseProgress: 42,
};

const APPEARS_IN = ['Dashboard grid', 'Course sidebar', 'Saved list'];

const INITIAL_TASKS = [
  { id: 'Q1', question: 'What does a component return?', done: false },
  { id: 'Q2', question: 'How do you pass a prop into a component?', done: false },
  { id: 'Q3', question: 'Build a', code: '<Badge/>', isExercise: true, done: false },
];

export default function Lesson() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [completed, setCompleted] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);

  const doneCount = tasks.filter((t) => t.done).length;
  const allDone = doneCount === tasks.length;

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    setCompleted(false);
  };

  const markComplete = () => {
    if (allDone) setCompleted(true);
  };

  return (
    <div className="lesson">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="sidebar">
        <button className="sidebar__back" type="button">
          <span aria-hidden="true">←</span> Back to overview
        </button>

        <p className="sidebar__eyebrow">
          Lesson {LESSON.number} of {LESSON.total}
        </p>
        <h1 className="sidebar__title">{LESSON.title}</h1>

        <button
          className="sidebar__brief-toggle"
          type="button"
          aria-expanded={briefOpen}
          onClick={() => setBriefOpen(!briefOpen)}
        >
          Read the brief
          <span
            className={`sidebar__chevron${briefOpen ? ' is-open' : ''}`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        <div className={`sidebar__brief${briefOpen ? ' is-open' : ''}`}>
          <p className="sidebar__brief-label">Brief</p>
          <p className="sidebar__brief-text">{LESSON.brief}</p>
        </div>

        <dl className="sidebar__meta">
          <div className="sidebar__meta-row">
            <dt>Time</dt><dd>{LESSON.duration}</dd>
          </div>
          <div className="sidebar__meta-row">
            <dt>Level</dt><dd>{LESSON.level}</dd>
          </div>
          <div className="sidebar__meta-row">
            <dt>XP</dt><dd className="sidebar__xp">+{LESSON.xp}</dd>
          </div>
        </dl>

        <div className="sidebar__progress">
          <p className="sidebar__progress-label">
            Course {LESSON.courseProgress}% complete
          </p>
          <div
            className="progressbar"
            role="progressbar"
            aria-valuenow={LESSON.courseProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span
              className="progressbar__fill"
              style={{ width: `${LESSON.courseProgress}%` }}
            />
          </div>
        </div>
      </aside>

      {/* ── Content ─────────────────────────────────────── */}
      <main className="content">
        <header className="content__head">
          <h2 className="content__heading">The lesson</h2>
          <div className="content__nav">
            <button className="btn btn--ghost" type="button">
              <span aria-hidden="true">←</span> Prev
            </button>
            <button className="btn btn--primary" type="button">
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </header>

        <section className="step">
          <div className="step__head">
            <span className="step__num step__num--one">1</span>
            <h3 className="step__title">The concept</h3>
          </div>

          <div className="video">
            <span className="video__play" aria-hidden="true">▶</span>
            <span className="video__label">Watch: components in 3 min</span>
          </div>

          <p className="step__body">
            A component is a function that returns markup.{' '}
            <code className="chip">props</code> are its inputs — pass them like
            attributes and read them inside.
          </p>
        </section>

        <section className="step">
          <div className="step__head">
            <span className="step__num step__num--two">2</span>
            <h3 className="step__title">How &amp; where it&rsquo;s used in this app</h3>
          </div>

          <div className="usage">
            <figure className="code">
              <figcaption className="code__path">
                src/components/CourseCard.jsx
              </figcaption>
              <pre className="code__body">
                <span className="tok-kw">const</span>{' '}
                <span className="tok-fn">CourseCard</span> ={' '}
                <span className="tok-punc">{'('}</span>
                <span className="tok-punc">{'{'}</span> title, progress{' '}
                <span className="tok-punc">{'}'}</span>
                <span className="tok-punc">{')'}</span> =&gt; {'('}
                {'\n  '}&lt;<span className="tok-tag">div</span>{' '}
                <span className="tok-attr">className</span>=
                <span className="tok-str">&quot;card&quot;</span>&gt;
                <span className="tok-punc">{'{'}</span>title
                <span className="tok-punc">{'}'}</span>&lt;/
                <span className="tok-tag">div</span>&gt;
                {'\n);'}
              </pre>
            </figure>

            <aside className="appears">
              <p className="appears__label">Where it appears</p>
              <ul className="appears__list">
                {APPEARS_IN.map((place, i) => (
                  <li
                    key={place}
                    className={`appears__item appears__item--${['a', 'b', 'c'][i % 3]}`}
                  >
                    {place}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="step">
          <div className="step__head">
            <span className="step__num step__num--three">3</span>
            <h3 className="step__title">Complete to finish</h3>
            <span className="step__count">
              {doneCount} / {tasks.length} tasks
            </span>
          </div>

          <ul className="tasks">
            {tasks.map((task) => (
              <li key={task.id}>
                <button
                  className={[
                    'task',
                    task.done ? 'task--done' : '',
                    task.isExercise ? 'task--exercise' : '',
                  ].join(' ').trim()}
                  type="button"
                  aria-pressed={task.done}
                  onClick={() => toggleTask(task.id)}
                >
                  <span className="task__id">{task.id}</span>
                  <span className="task__question">
                    {task.question}
                    {task.code && (
                      <code className="chip chip--code">{task.code}</code>
                    )}
                    {task.isExercise && ' component'}
                  </span>
                  <span className="task__mark" aria-hidden="true">
                    {task.done ? '✓' : ''}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <footer className="content__foot">
          <p className={`content__hint${allDone ? ' is-ready' : ''}`}>
            {!allDone && `Answer all ${tasks.length} to unlock the next lesson`}
            {allDone && !completed && 'All tasks answered — you can complete the lesson'}
            {completed && `Lesson complete · +${LESSON.xp} XP`}
          </p>

          <button
            className="btn btn--complete"
            type="button"
            disabled={!allDone || completed}
            onClick={markComplete}
          >
            <span aria-hidden="true">✓</span>
            {completed ? 'Completed' : 'Mark complete'}
          </button>
        </footer>

        <p className="origin">Monolithic reference · single bundle, no federation</p>
      </main>
    </div>
  );
}