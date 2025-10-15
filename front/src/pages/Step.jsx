import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NavBar from '../components/NavBar.jsx';
import { courses } from '../data/courses.js';
import { useMetaMask } from '../contexts/MetaMaskContext';
import { verifyCode } from '../services/api.js';

const Step = () => {
  const { courseId, lessonId, stepId } = useParams();
  const navigate = useNavigate();
  const { markStepComplete, checkStepCompletion, account, signer, contract } = useMetaMask();
  const [stepData, setStepData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [code, setCode] = useState('');
  const [compilationResult, setCompilationResult] = useState(null);
  const [error, setError] = useState(null);
  const [showExpectedCode, setShowExpectedCode] = useState(false);
  const [isStepCompleted, setIsStepCompleted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const course = courses.find(c => c.id === courseId);
    setCourseData(course);
    if (course) {
      const lesson = course.lessons.find(l => l.id === lessonId);
      if (lesson) {
        const step = lesson.steps.find(s => s.id === stepId);
        setStepData(step);
        if (step.initialCode) {
          setCode(step.initialCode);
        }
      }
    }
    // Reset completion state when changing lessons
    setIsStepCompleted(false);
    setCompilationResult(null);
    setError(null);
  }, [courseId, lessonId, stepId]);

  // Check if step is completed in the contract
  useEffect(() => {
    const checkCompletion = async () => {
      try {
        const isCompleted = await checkStepCompletion(stepId);
        setIsStepCompleted(isCompleted);
      } catch (error) {
        console.error('Error checking step completion:', error);
        setError('Failed to check step completion');
      }
    };

    checkCompletion();
  }, [stepId, checkStepCompletion]);

  const handleNext = async () => {
    if (!isStepCompleted) {
      return;
    }

    try {
      // Mark step as completed in the contract
      await markStepComplete(stepId, courseId);
      
      const currentLesson = courseData.lessons.find(l => l.id === lessonId);
      const currentStepIndex = currentLesson.steps.findIndex(s => s.id === stepId);
      
      if (currentStepIndex < currentLesson.steps.length - 1) {
        navigate(`/courses/${courseId}/lesson/${lessonId}/step/${currentLesson.steps[currentStepIndex + 1].id}`);
      } else {
        const currentLessonIndex = courseData.lessons.findIndex(l => l.id === lessonId);
        if (currentLessonIndex < courseData.lessons.length - 1) {
          const nextLesson = courseData.lessons[currentLessonIndex + 1];
          navigate(`/courses/${courseId}/lesson/${nextLesson.id}/step/${nextLesson.steps[0].id}`);
        } else {
          navigate(`/courses/${courseId}`);
        }
      }
    } catch (error) {
      console.error('Error marking step as complete:', error);
      setError('Failed to mark step as complete');
    }
  };

  const handleCompile = async () => {
    try {
      setError(null);
      setCompilationResult(null);
      setIsVerifying(true);
  
      if (!code.trim()) {
        setCompilationResult({
          success: false,
          message: 'Please write some code before submitting.'
        });
        setIsVerifying(false);
        return;
      }
  
      if (!account || !signer || !contract) {
        setError('Please connect your wallet to verify code.');
        setIsVerifying(false);
        return;
      }
  
      // Step 1: Sign a message for backend authentication
      const message = `Verify code submission for step ${stepId}`;
      const signature = await signer.signMessage(message);
  
      // Step 2: Call backend API to verify code
      const result = await verifyCode(
        stepId,
        courseId,
        code,
        stepData.expectedCode || '',
        signature,
        message,
        account
      );
  
      if (!result.isCorrect) {
        setCompilationResult({
          success: false,
          message: result.message || 'Code verification failed. Please check your implementation and try again.'
        });
        setIsStepCompleted(false);
        return;
      }
  
      // Step 3: Code is correct, send transaction via MetaMask
      const tx = await contract.markStepComplete(stepId, courseId);
      await tx.wait(); // Wait for confirmation
  
      // Step 4: Update UI
      setCompilationResult({
        success: true,
        message: `Code verified! Step completed on blockchain. TxHash: ${tx.hash}`
      });
      setIsStepCompleted(true);
  
      // Update local state to reflect completion
      if (stepData) stepData.completed = true;
  
    } catch (err) {
      console.error('Verification or transaction error:', err);
      setError(err.message || 'Failed to verify code or complete step. Please try again.');
      setIsStepCompleted(false);
    } finally {
      setIsVerifying(false);
    }
  };
  
  const highlightKeywords = (text) => {
    const keywords = [
      'contract', 'pragma', 'solidity', 'function', 'public', 'private', 'view', 'pure', 'payable',
      'string', 'uint', 'int', 'bool', 'address', 'bytes', 'mapping', 'array', 'struct', 'enum',
      'event', 'emit', 'require', 'assert', 'revert', 'if', 'else', 'for', 'while', 'do', 'break',
      'continue', 'return', 'this', 'super', 'constructor', 'fallback', 'receive'
    ];
    
    let result = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      result = result.replace(regex, match => `<span class="text-[#C8AA6E]">${match}</span>`);
    });
    return result;
  };

  const TextWithHighlight = ({ children }) => {
    if (typeof children !== 'string') return children;
    return <span dangerouslySetInnerHTML={{ __html: highlightKeywords(children) }} />;
  };

  const formatCodeBlock = (code) => {
    // Remove the first and last backticks if they exist
    let formattedCode = code.replace(/^```\s*/, '').replace(/\s*```$/, '');
    // Trim whitespace from each line while preserving indentation
    formattedCode = formattedCode.split('\n').map(line => line.trimEnd()).join('\n');
    return formattedCode;
  };

  if (!stepData || !courseData) {
    return (
      <div className="min-h-screen bg-black">
        <NavBar />
        <main className="flex-grow w-full max-w-[1120px] mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#C8AA6E] mb-8">Step not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      <NavBar />
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-8 py-8 overflow-hidden">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">{stepData.title}</h1>
        </div>

        <div className="grid grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Left side - Content */}
          <div className="space-y-6 overflow-y-auto pr-4 custom-scrollbar pb-8">
            <div className="bg-black/50 border border-[#C8AA6E]/20 rounded-lg p-8">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom styling for different markdown elements
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-[#C8AA6E] mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold text-[#C8AA6E] mb-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-bold text-[#C8AA6E] mb-2" {...props} />,
                    p: ({node, children, ...props}) => (
                      <p className="text-gray-300 mb-4" {...props}>
                        <TextWithHighlight>{children}</TextWithHighlight>
                      </p>
                    ),
                    ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-300 mb-4" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-300 mb-4" {...props} />,
                    li: ({node, children, ...props}) => (
                      <li className="text-gray-300 mb-2" {...props}>
                        <TextWithHighlight>{children}</TextWithHighlight>
                      </li>
                    ),
                    code: ({node, inline, ...props}) => 
                      inline ? (
                        <code className="bg-black/30 text-[#C8AA6E] px-1 py-0.5 rounded" {...props} />
                      ) : (
                        <div className="bg-black/30 border border-[#C8AA6E]/10 rounded-lg p-4 mb-4">
                          <pre className="text-[#C8AA6E] font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                            <code {...props} />
                          </pre>
                        </div>
                      ),
                    blockquote: ({node, children, ...props}) => (
                      <blockquote className="border-l-4 border-[#C8AA6E] pl-4 italic text-gray-300 mb-4" {...props}>
                        <TextWithHighlight>{children}</TextWithHighlight>
                      </blockquote>
                    ),
                    a: ({node, ...props}) => (
                      <a className="text-[#C8AA6E] hover:text-[#C8AA6E]/80 underline" {...props} />
                    ),
                    strong: ({node, children, ...props}) => (
                      <strong className="text-[#C8AA6E]" {...props}>
                        <TextWithHighlight>{children}</TextWithHighlight>
                      </strong>
                    ),
                    em: ({node, children, ...props}) => (
                      <em className="text-gray-300" {...props}>
                        <TextWithHighlight>{children}</TextWithHighlight>
                      </em>
                    ),
                  }}
                >
                  {stepData.content}
                </ReactMarkdown>
              </div>
            </div>

            {stepData.expectedCode && (
              <div className="bg-black/50 border border-[#C8AA6E]/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Expected Code</h3>
                  <button
                    onClick={() => setShowExpectedCode(!showExpectedCode)}
                    className="text-[#C8AA6E] hover:text-[#C8AA6E]/80 transition-colors"
                  >
                    {showExpectedCode ? 'Hide' : 'Show'}
                  </button>
                </div>
                {showExpectedCode && (
                  <Editor
                    height="200px"
                    defaultLanguage="solidity"
                    theme="vs-dark"
                    value={stepData.expectedCode}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyond: false,
                      automaticLayout: true,
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Right side - Code Editor */}
          <div className="space-y-6 overflow-y-auto pr-4 custom-scrollbar pb-8">
            <div className="bg-black/50 border border-[#C8AA6E]/20 rounded-lg p-4">
              <Editor
                height="400px"
                defaultLanguage="solidity"
                theme="vs-dark"
                value={code}
                onChange={setCode}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyond: false,
                  automaticLayout: true,
                }}
              />
            </div>

            <div className="flex flex-col space-y-6">
              <button
                onClick={handleCompile}
                disabled={isVerifying}
                className={`w-full px-8 py-5 rounded-lg transition-colors font-medium text-lg shadow-lg ${
                  isVerifying 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-[#C8AA6E] text-black hover:bg-[#C8AA6E]/90 hover:shadow-[#C8AA6E]/20'
                }`}
              >
                {isVerifying ? 'Verifying Code...' : 'Check Answer'}
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepCompleted}
                className={`w-full px-8 py-5 rounded-lg transition-colors font-medium text-lg shadow-lg ${
                  isStepCompleted 
                    ? 'bg-[#C8AA6E] text-black hover:bg-[#C8AA6E]/90 hover:shadow-[#C8AA6E]/20' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Complete & Continue
              </button>
            </div>

            {compilationResult && (
              <div className={`p-6 rounded-lg ${
                compilationResult.success 
                  ? 'bg-green-500/20 border border-green-500/50 text-green-500' 
                  : 'bg-red-500/20 border border-red-500/50 text-red-500'
              }`}>
                {compilationResult.message}
              </div>
            )}

            {error && (
              <div className="p-6 rounded-lg bg-red-500/20 border border-red-500/50 text-red-500">
                {error}
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: black;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C8AA6E;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #C8AA6E/90;
        }
      `}</style>
    </div>
  );
};

export default Step;