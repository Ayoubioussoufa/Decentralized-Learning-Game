import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { courses } from '../data/courses';
import Footer from '../components/Footer';
import StayUpdated from '../components/StayUpdated';
import { useMetaMask } from '../contexts/MetaMaskContext';
import { getCourseProgress as getCourseProgressAPI } from '../services/api';

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const { account, provider } = useMetaMask();

  useEffect(() => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setCourseData(course);
      // Calculate total steps
      const totalStepsCount = course.lessons.reduce((total, lesson) => total + lesson.steps.length, 0);
      setTotalSteps(totalStepsCount);
    } else {
      navigate('/courses');
    }
  }, [courseId, navigate]);

  useEffect(() => {
    const loadProgress = async () => {
      if (account && courseId) {
        try {
          const progress = await getCourseProgressAPI(account, courseId);
          
          // Calculate progress from completed steps vs total steps
          // Convert string values to numbers (API returns strings to avoid BigInt serialization issues)
          const completedStepsNum = parseInt(progress.completedSteps) || 0;
          const calculatedPercentage = totalSteps > 0 ? Math.round((completedStepsNum / totalSteps) * 100) : 0;
          
          setCompletionPercentage(calculatedPercentage);
          setCompletedSteps(completedStepsNum);
        } catch (error) {
          console.error('Error loading progress:', error);
          // Set default values if there's an error
          setCompletionPercentage(0);
          setCompletedSteps(0);
        }
      }
    };

    loadProgress();
  }, [account, courseId, totalSteps]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const handleStepClick = (lessonId, stepId) => {
    navigate(`/courses/${courseId}/lesson/${lessonId}/step/${stepId}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <main className="flex-grow w-full max-w-[1120px] mx-auto px-4 py-8">
        <div className="mb-12">
          <span className="text-[#C8AA6E]/60 text-sm font-medium uppercase tracking-wider">
            {courseData.difficulty}
          </span>
          <h1 className="text-4xl font-bold text-white mt-2">{courseData.title}</h1>
          <p className="text-[#C8AA6E] text-xl mt-4">{courseData.subtitle}</p>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl">{courseData.description}</p>
          
          {/* Progress Section */}
          {account && (
            <div className="mt-8 bg-black/50 border border-[#C8AA6E]/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#C8AA6E] mb-4">Your Progress</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">
                  {completedSteps} of {totalSteps} steps completed
                </span>
                <span className="text-[#C8AA6E] font-bold text-xl">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-[#C8AA6E] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-[#C8AA6E] mb-6">Course Lessons</h2>
          {courseData.lessons.map((lesson, lessonIndex) => (
            <div 
              key={lesson.id}
              className="bg-black border border-[#C8AA6E]/20 rounded-lg p-6 hover:border-[#C8AA6E]/40 transition-colors"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Lesson {lessonIndex + 1}: {lesson.title}
                </h3>
                <p className="text-gray-400 mt-2">{lesson.description}</p>
              </div>

              <div className="space-y-4">
                {lesson.steps.map((step, stepIndex) => (
                  <div 
                    key={step.id}
                    onClick={() => handleStepClick(lesson.id, step.id)}
                    className="bg-black/50 border border-[#C8AA6E]/10 rounded-lg p-4 hover:border-[#C8AA6E]/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-[#C8AA6E]/20 flex items-center justify-center">
                          <span className="text-[#C8AA6E] font-medium">{stepIndex + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            {step.title}
                          </h4>
                          <p className="text-gray-400 mt-1">{step.briefDescription}</p>
                        </div>
                      </div>
                      {step.completed && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-green-500 text-sm">Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <StayUpdated />
    </div>
  );
};

export default Course; 