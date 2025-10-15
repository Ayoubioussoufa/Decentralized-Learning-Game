// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract UserProgress {
    struct User {
        string username;
        uint256 joinDate;
        uint256 totalPoints;
        bool isActive;
    }

    struct CourseProgress {
        uint256 completedSteps;
        uint256 totalSteps;
        bool isCompleted;
    }

    mapping(address => User) public users;
    mapping(address => mapping(string => bool)) public completedLessons; // Mapping for completed lessons
    mapping(address => mapping(string => bool)) public completedSteps;   // Mapping for completed steps
    mapping(address => mapping(string => CourseProgress)) public courseProgress; // Mapping for course progress

    address public owner;
    
    event UserRegistered(address indexed user, string username);
    event LessonCompleted(address indexed user, string lessonId);
    event StepCompleted(address indexed user, string stepId, string courseId);
    event CourseProgressUpdated(address indexed user, string courseId, uint256 completionPercentage);
    event PointsEarned(address indexed user, uint256 points);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerUser(string memory _username) public {
        require(!users[msg.sender].isActive, "User already registered");
        
        users[msg.sender].username = _username;
        users[msg.sender].joinDate = block.timestamp;
        users[msg.sender].totalPoints = 0;
        users[msg.sender].isActive = true;
        
        emit UserRegistered(msg.sender, _username);
    }

    function completeLesson(string memory _lessonId) public {
        require(users[msg.sender].isActive, "User not registered");
        require(!completedLessons[msg.sender][_lessonId], "Lesson already completed");
        
        completedLessons[msg.sender][_lessonId] = true;
        users[msg.sender].totalPoints += 100; // Award 100 points for completing a lesson
        
        emit LessonCompleted(msg.sender, _lessonId);
        emit PointsEarned(msg.sender, 100);
    }

    function completeStep(string memory _stepId, string memory _courseId) public {
        require(users[msg.sender].isActive, "User not registered");
        require(!completedSteps[msg.sender][_stepId], "Step already completed");
        
        completedSteps[msg.sender][_stepId] = true;
        users[msg.sender].totalPoints += 10; // Award 10 points for completing a step
        
        // Update course progress
        courseProgress[msg.sender][_courseId].completedSteps += 1;
        
        emit StepCompleted(msg.sender, _stepId, _courseId);
        emit PointsEarned(msg.sender, 10);
        
        // Emit course progress update
        uint256 completionPercentage = calculateCourseProgress(msg.sender, _courseId);
        emit CourseProgressUpdated(msg.sender, _courseId, completionPercentage);
    }

    function setCourseTotalSteps(string memory _courseId, uint256 _totalSteps) public onlyOwner {
        // This function should be called when a course is initialized
        // For now, we'll handle this in the frontend by calculating it dynamically
    }

    function calculateCourseProgress(address _user, string memory _courseId) public view returns (uint256) {
        CourseProgress memory progress = courseProgress[_user][_courseId];
        if (progress.totalSteps == 0) {
            return 0;
        }
        return (progress.completedSteps * 100) / progress.totalSteps;
    }

    function getCourseProgress(address _user, string memory _courseId) public view returns (
        uint256 completedStep,
        uint256 totalSteps,
        uint256 completionPercentage,
        bool isCompleted
    ) {
        CourseProgress memory userProgress = courseProgress[_user][_courseId];
        uint256 percentage = calculateCourseProgress(_user, _courseId);
        return (userProgress.completedSteps, userProgress.totalSteps, percentage, userProgress.isCompleted);
    }

    function getUserProgress(address _user) public view returns (
        string memory username,
        uint256 joinDate,
        uint256 totalPoints,
        bool isActive
    ) {
        return (users[_user].username, users[_user].joinDate, users[_user].totalPoints, users[_user].isActive);
    }

    function isLessonCompleted(address _user, string memory _lessonId) public view returns (bool) {
        return completedLessons[_user][_lessonId];
    }

    function isStepCompleted(address _user, string memory _stepId) public view returns (bool) {
        return completedSteps[_user][_stepId];
    }

    // Helper function to get all completed steps for a user (for frontend calculation)
    function getCompletedStepsCount(address /* _user */) public pure returns (uint256) {
        // This is a simplified version - in a real implementation, you'd want to track this differently
        // For now, we'll rely on the frontend to calculate total steps from the course data
        return 0; // Placeholder - frontend will calculate this
    }
}
