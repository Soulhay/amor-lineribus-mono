import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Lesson from './Lesson';

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className="app__nav">
          <span className="app__brand">Amor Lineribus</span>
          <nav className="app__links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/lesson">Lesson</NavLink>
          </nav>
        </header>

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lesson" element={<Lesson />} />
          </Routes>
        </main>

        <footer className="app__footer">
          Amor Lineribus &middot; Alma Mater Europaea
        </footer>
      </div>
    </HashRouter>
  );
}