import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Courses from './pages/Courses.jsx';
import Course from './pages/Course.jsx';
import Step from './pages/Step.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<Course />} />
        <Route path="/courses/:courseId/lesson/:lessonId/step/:stepId" element={<Step />} />
      </Routes>
    </Router>
  );
}

export default App;
