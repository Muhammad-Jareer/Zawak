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
        toast.error(error.response ? error.response.data.message : "Signup failed, please try again");
        return null;
    }
};

export const isAuthenticated = async () => {
    try {
        const response = await api.get('/auth/user');
        if(response.status === 200){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export const get_user = async () => {
    try {
        const response = await api.get('/auth/user')
        if(response.status === 200)
            return response.data
        return null
    } catch (error) {
        // console.log("error while getting user ", error)
    }
}

export const api_login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        if(response.status === 200){
            toast.success("You LoggedIn successfully")
            return response.data;
        }
    } catch (error) {
        toast.error(error.response ? error.response.data.message : "Login failed, please try again");
        return null;
    }
};

export const api_logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        if(response.status === 200){
            toast.success(`You have logout successfully`)
            return true;
        }
    } catch (error) {
        toast.error(error.response ? error.response.data.message : "Login failed, please try again");
        return false;
    }
};


export const forget_password = async (email) => {
    try {
        const response = await api.post('/auth/forgot-password', email);
        if(response.status === 200) {
            toast.success("Please! Check your email")
            return true
        }
    } catch (error) {
        toast.error(error.response.data.message)
        return false
    }
}

export const api_reset_password = async (token, pass) => {
    console.log(token, pass)
    try {
        const response = await api.post('/auth/reset-password', { token, pass });
        if(response.status === 200) {
            toast.success("You have successfully reset the password")
            return true
        }
    } catch (error) {
        toast.error(error.response.data.message)
        return false
    }
}
