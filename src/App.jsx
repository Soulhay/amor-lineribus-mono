import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Lesson from './Course';
import Course from './Course';
import Landing from './Landing';
import './styles/tokens.css';
import './styles/app.css';
import './styles/landing.css';
import './styles/lesson.css';


export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className="app__nav">
          <NavLink to="/" className="app__brand">
            Amor Lineribus <span className="app__brand-slash">/learn</span>
          </NavLink>

          <nav className="app__links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/course">Courses</NavLink>
            <NavLink to="/lesson">Lesson</NavLink>
          </nav>

          <NavLink to="/course" className="btn btn--primary btn--sm">
            Start learning
          </NavLink>
        </header>

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/course" element={<Course />} />
            <Route path="/lesson" element={<Lesson />} />
          </Routes>
        </main>

        <footer className="app__footer">
          <div className="app__footer-inner">
            <div className="app__footer-brand">
              <strong>Amor Lineribus</strong>
              <p>A modular, multi-framework platform for learning modern web development.</p>
            </div>

            <div className="app__footer-col">
              <p className="app__footer-head">Platform</p>
              <ul><li>Courses</li><li>Frameworks</li><li>Roadmap</li></ul>
            </div>

            <div className="app__footer-col">
              <p className="app__footer-head">Resources</p>
              <ul><li>Docs</li><li>Blog</li><li>Support</li></ul>
            </div>

            <div className="app__footer-col">
              <p className="app__footer-head">About</p>
              <ul><li>Alma Mater Europaea</li><li>Diploma project</li><li>Contact</li></ul>
            </div>
          </div>

          <p className="app__footer-legal">
            © 2026 Amor Lineribus · Alma Mater Europaea
          </p>
        </footer>
      </div>
    </HashRouter>
  );
}