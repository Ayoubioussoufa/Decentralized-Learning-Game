import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import StayUpdated from '../components/StayUpdated';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useMetaMask } from '../contexts/MetaMaskContext';
import { getCourseProgress as getCourseProgressAPI } from '../services/api';

const courses = [
  {
    id: "solidity-basics",
    title: "Solidity: Beginner to Intermediate Smart Contracts",
    subtitle: "Solidity Beginner Intermediate",
    description: "Get up to speed with the basics of Solidity.",
    difficulty: "Beginner",
    completion: 0,
    backgroundColor: "bg-gray-800",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832"
  },
  {
    id: "chainlink-oracles",
    title: "Chainlink: Decentralized Oracles Solidity Advanced",
    subtitle: "Chainlink Oracle Intermediate",
    description: "Combine the real-world and all of its changes and information with our beloved zombies",
    difficulty: "Intermediate",
    completion: 0,
    backgroundColor: "bg-gray-800",
    imageUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=040"
  },
  {
    id: "advanced-solidity",
    title: "Advanced Solidity: Get In-depth Knowledge",
    subtitle: "Solidity Advanced",
    description: "Deploying Ethereum DApps with Truffle will walk you through the process of deploying your smart contracts with Truffle.",
    difficulty: "Advanced",
    completion: 0,
    backgroundColor: "bg-gray-800",
    imageUrl: "https://cryptozombies.io/course/1f0a6418177020aeb1e1.png"
  }
];

function Courses() {
  const navigate = useNavigate();
  const { account } = useMetaMask();
  const [courseProgress, setCourseProgress] = useState({});

  useEffect(() => {
    const loadAllProgress = async () => {
      if (account) {
        const progressData = {};
        for (const course of courses) {
          try {
            const progress = await getCourseProgressAPI(account, course.id);
            // Convert string value to number (API returns strings to avoid BigInt serialization issues)
            progressData[course.id] = parseInt(progress.completionPercentage) || 0;
          } catch (error) {
            console.error(`Error loading progress for ${course.id}:`, error);
            progressData[course.id] = 0;
          }
        }
        setCourseProgress(progressData);
      }
    };

    loadAllProgress();
  }, [account]);

  const handleStartCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <NavBar />
      
      <main className="flex-grow w-full max-w-[1120px] mx-auto px-4">
        <div className="py-16">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              el: '.swiper-custom-pagination'
            }}
            className="h-[500px] mb-4"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <div className={`bg-black h-full rounded-lg border border-[#C8AA6E]/20 overflow-hidden flex`}>
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div>
                      <span className="text-[#C8AA6E]/60 text-sm font-medium uppercase tracking-wider">
                        {course.difficulty}
                      </span>
                      <h3 className="text-4xl font-bold text-white mt-2">{course.title}</h3>
                      <p className="text-[#C8AA6E] text-xl mt-4">{course.subtitle}</p>
                      <p className="text-gray-400 text-lg mt-4 max-w-xl">{course.description}</p>
                    </div>
                    
                    {/* Progress Section for Swiper */}
                    {account && courseProgress[course.id] > 0 && (
                      <div className="mt-6 bg-black/30 border border-[#C8AA6E]/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium text-sm">Progress</span>
                          <span className="text-[#C8AA6E] font-bold">{courseProgress[course.id]}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-[#C8AA6E] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${courseProgress[course.id]}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => handleStartCourse(course.id)}
                      className="mt-8 w-48 bg-[#C8AA6E] text-black py-4 rounded-lg hover:bg-[#C8AA6E]/90 transition-colors font-medium text-lg"
                    >
                      {courseProgress[course.id] > 0 ? 'Continue Course' : 'Start Course'}
                    </button>
                  </div>
                  
                  <div className="w-[45%] relative">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-custom-pagination flex justify-center gap-2 mb-24"></div>

          <h2 className="text-3xl font-bold text-[#C8AA6E] mb-12 text-center">Courses</h2>
          
          <div className="grid gap-8">
            {courses.map((course, index) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </main>
      <StayUpdated />
      <Footer />
    </div>
  );
}

export default Courses;