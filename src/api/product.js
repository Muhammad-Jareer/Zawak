import { toast } from 'react-toastify';
import api from '../lib/api';

export const getAllProducts = async () => {
    try {
        const response = await api.get('/product/gps');
        if(response.status === 200){
            console.log(response.data);
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