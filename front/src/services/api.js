import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerUser = async (username, signature, message, address) => {
    try {
        const response = await api.post('/register', {
            username,
            signature,
            message,
            address
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const completeLesson = async (lessonId, signature, message, address) => {
    try {
        const response = await api.post('/complete-lesson', {
            lessonId,
            signature,
            message,
            address
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const completeStep = async (stepId, signature, message, address) => {
    try {
        const response = await api.post('/complete-step', {
            stepId,
            signature,
            message,
            address
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getUserProgress = async (address) => {
    try {
        const response = await api.get(`/progress/${address}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const checkLessonCompletion = async (address, lessonId) => {
    try {
        const response = await api.get(`/check-lesson/${address}/${lessonId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const checkStepCompletion = async (address, stepId) => {
    try {
        const response = await api.get(`/check-step/${address}/${stepId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 