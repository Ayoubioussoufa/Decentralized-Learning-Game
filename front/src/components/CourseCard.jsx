import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '../contexts/MetaMaskContext';
import { getCourseProgress as getCourseProgressAPI } from '../services/api';

const CourseCard = ({
  id,
  title,
  subtitle,
  description,
  difficulty,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const { account } = useMetaMask();
  const [completionPercentage, setCompletionPercentage] = React.useState(0);

  React.useEffect(() => {
    const loadProgress = async () => {
      if (account) {
        try {
          const progress = await getCourseProgressAPI(account, id);
          // Convert string value to number (API returns strings to avoid BigInt serialization issues)
          const percentage = parseInt(progress.completionPercentage) || 0;
          setCompletionPercentage(percentage);
        } catch (error) {
          console.error('Error loading course progress:', error);
          setCompletionPercentage(0);
        }
      }
    };

    loadProgress();
  }, [account, id]);

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

        {/* Progress Section */}
        {account && completionPercentage > 0 && (
          <div className="mt-6 bg-black/30 border border-[#C8AA6E]/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium text-sm">Progress</span>
              <span className="text-[#C8AA6E] font-bold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-[#C8AA6E] h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <button 
          onClick={handleStartCourse}
          className="mt-8 w-48 bg-[#C8AA6E] text-black py-3 rounded-lg hover:bg-[#C8AA6E]/90 transition-colors font-medium"
        >
          {completionPercentage > 0 ? 'Continue Course' : 'Start Course'}
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
