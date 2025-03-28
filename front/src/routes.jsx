import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Step from './pages/Step';
import NavBar from './components/NavBar';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<Course />} />
        <Route path="/courses/:courseId/lesson/:lessonId/step/:stepId" element={<Step />} />
      </Routes>
    </>
  );
};

export default AppRoutes; 