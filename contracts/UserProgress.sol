// SPDX-License-Identifier: MIT
pragma solidity >=0.8.29 <0.9.0;

contract UserProgress {
    struct User {
        string username;
        uint256 joinDate;
        uint256 totalPoints;
        bool isActive;
    }

    mapping(address => User) public users;
    mapping(address => mapping(string => bool)) public completedLessons; // Mapping for completed lessons
    mapping(address => mapping(string => bool)) public completedSteps;   // Mapping for completed steps

    address public owner;
    
    event UserRegistered(address indexed user, string username);
    event LessonCompleted(address indexed user, string lessonId);
    event StepCompleted(address indexed user, string stepId);
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

    function completeStep(string memory _stepId) public {
        require(users[msg.sender].isActive, "User not registered");
        require(!completedSteps[msg.sender][_stepId], "Step already completed");
        
        completedSteps[msg.sender][_stepId] = true;
        users[msg.sender].totalPoints += 10; // Award 10 points for completing a step
        
        emit StepCompleted(msg.sender, _stepId);
        emit PointsEarned(msg.sender, 10);
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
}
