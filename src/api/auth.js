import { toast } from 'react-toastify';
import api from '../lib/api';

export const api_signup = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        if(response.status === 200){
            toast.success("Account created successfully")
            return response.data;
        }
    } catch (error) {
        toast.error(error.response.data.message)
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
        if(response.status === 200){
            toast.success("You LoggedIn As ")
            return response.data;
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
};