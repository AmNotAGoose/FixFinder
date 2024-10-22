import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const createAxiosInstance = (token) => {
    const axiosInstance = axios.create({ 
        baseURL: API_URL 
    });
    
    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const getTest = async (token) => {
    try {
        const axios = await createAxiosInstance(token);
        const response = await axios.get(`${API_URL}/api`);
        return response.data;
    } catch (error) {
        console.error('Error getting test:', error);
        throw error;
    }
};

export const getModels = async (token) => {
    try {
        const axios = await createAxiosInstance(token);
        const response = await axios.get(`${API_URL}/api/protected/getmodels`);
        return response.data;
    } catch (error) {
        console.error('Error fetching phone models:', error);
        throw error;
    }
};

export const getArticles = async (token, prompt) => {
    try {
        const axios = await createAxiosInstance(token);
        const response = await axios.get(`${API_URL}/api/protected/getarticles`, {
            params: { prompt }
        });
        return response.data.result.text;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export const getListings = async (token) => {
    try {
        const axios = await createAxiosInstance(token);
        const response = await axios.get(`${API_URL}/api/protected/getlistings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching listing s:', error);
        throw error;
    }
};

export const getRepairShops = async (token) => {
    try {
        const axios = await createAxiosInstance(token);
        const response = await axios.get(`${API_URL}/api/protected/getrepairshops`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reapir shops:', error);
        throw error;
    }
};