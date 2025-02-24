import { toast } from 'react-toastify';
import api from '../lib/api';

export const api_signup = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        toast(error.response.data)
    }
};

export const get_user = async () => {
    try {
        const res = await api.get('/auth/user')
        return res.data
    } catch (error) {
        toast(error.response.data)
    }
}

export const api_login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};