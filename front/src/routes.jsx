import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Step from './pages/Step';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />
        <Route path="/courses/:courseId" element={
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        } />
        <Route path="/courses/:courseId/lesson/:lessonId/step/:stepId" element={
          <ProtectedRoute>
            <Step />
          </ProtectedRoute>
        } />
        {/* Placeholder routes for blog and videos */}
        <Route path="/blog" element={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#C8AA6E] mb-4">Blog Coming Soon</h1>
              <p className="text-gray-400">This section is under development.</p>
            </div>
          </div>
        } />
        <Route path="/videos" element={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#C8AA6E] mb-4">Videos Coming Soon</h1>
              <p className="text-gray-400">This section is under development.</p>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
};

export default AppRoutes; 