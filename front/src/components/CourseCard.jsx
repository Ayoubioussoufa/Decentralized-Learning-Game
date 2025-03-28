import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({
  id,
  title,
  subtitle,
  description,
  difficulty,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="bg-black rounded-lg border border-[#C8AA6E]/20 overflow-hidden flex flex-col md:flex-row">
      <div className="flex-1 p-8 flex flex-col justify-center">
        <div>
          <span className="text-[#C8AA6E]/60 text-sm font-medium uppercase tracking-wider">
            {difficulty}
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">{title}</h3>
          <p className="text-[#C8AA6E] mt-4">{subtitle}</p>
          <p className="text-gray-400 mt-4 max-w-xl">{description}</p>
        </div>
        
        <button 
          onClick={handleStartCourse}
          className="mt-8 w-48 bg-[#C8AA6E] text-black py-3 rounded-lg hover:bg-[#C8AA6E]/90 transition-colors font-medium"
        >
          Start Course
        </button>
      </div>
      
      <div className="w-full md:w-[488px] h-[320px] flex items-center justify-center bg-black">
        <img 
          src={imageUrl} 
          alt={title} 
          className="max-w-[80%] max-h-[80%] object-contain" 
        />
      </div>
    </div>
  );
};

export default CourseCard;
