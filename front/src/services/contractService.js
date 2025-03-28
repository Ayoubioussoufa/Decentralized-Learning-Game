import { ethers } from 'ethers';
import UserProgressABI from '../contracts/UserProgress.json';
import contractAddress from '../contracts/contract-address.json';

const CONTRACT_ADDRESS = contractAddress.address;

export const createContract = (provider, signer) => {
    return new ethers.Contract(CONTRACT_ADDRESS, UserProgressABI, signer);
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

export const completeStep = async (contract, stepId) => {
    try {
        const tx = await contract.completeStep(stepId);
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