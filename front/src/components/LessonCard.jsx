import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';

const LessonCard = ({ lesson, onClick }) => {
  return (
    <div 
      className="bg-black rounded-lg shadow-md p-6 cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(lesson.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{lesson.title}</h3>
        {lesson.completed && (
          <Award className="w-6 h-6 text-green-500" />
        )}
      </div>
      <p className="text-gray-600 mb-4">{lesson.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4" />
          <span>{lesson.difficulty}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{lesson.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
