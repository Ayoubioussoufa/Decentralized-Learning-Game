import { ethers } from 'ethers';
import UserProgress from '../../../contracts/artifacts/contracts/UserProgress.sol/UserProgress.json' assert { type: "json" };

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const CONTRACT_ABI = UserProgress.abi;

export const createContract = (provider, signer) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const registerUser = async (contract, username) => {
    try {
        const tx = await contract.registerUser(username);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const completeLesson = async (contract, lessonId) => {
    try {
        const tx = await contract.completeLesson(lessonId);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('Error completing lesson:', error);
        throw error;
    }
};

export const completeStep = async (contract, stepId, courseId) => {
    try {
        const tx = await contract.completeStep(stepId, courseId);
        await tx.wait();
        return true;
    } catch (error) {
        console.error('Error completing step:', error);
        throw error;
    }
};

export const getUserProgress = async (contract, userAddress) => {
    try {
        const progress = await contract.getUserProgress(userAddress);
        return progress;
    } catch (error) {
        console.error('Error getting user progress:', error);
        throw error;
    }
};

export const isLessonCompleted = async (contract, userAddress, lessonId) => {
    try {
        const completed = await contract.isLessonCompleted(userAddress, lessonId);
        return completed;
    } catch (error) {
        console.error('Error checking lesson completion:', error);
        throw error;
    }
};

export const isStepCompleted = async (contract, userAddress, stepId) => {
    try {
        const completed = await contract.isStepCompleted(userAddress, stepId);
        return completed;
    } catch (error) {
        console.error('Error checking step completion:', error);
        throw error;
    }
};

export const getCourseProgress = async (contract, userAddress, courseId) => {
    try {
        const progress = await contract.getCourseProgress(userAddress, courseId);
        return {
            completedSteps: progress.completedSteps.toNumber(),
            totalSteps: progress.totalSteps.toNumber(),
            completionPercentage: progress.completionPercentage.toNumber(),
            isCompleted: progress.isCompleted
        };
    } catch (error) {
        console.error('Error getting course progress:', error);
        throw error;
    }
};

export const calculateCourseProgress = async (contract, userAddress, courseId) => {
    try {
        const percentage = await contract.calculateCourseProgress(userAddress, courseId);
        return percentage.toNumber();
    } catch (error) {
        console.error('Error calculating course progress:', error);
        throw error;
    }
}; 