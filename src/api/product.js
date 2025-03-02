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
        console.log(error)
    }
};

export const queryProducts = async (query) => {
    try {
        const response = await api.get(`/product/qp?q=${query}`);
        if(response.status === 200){
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error)
    }
};

export const getFeaturedProducts = async () => {
    try {
        const response = await api.get('/product/gfp');
        if(response.status === 200){
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error)
        return 'ERROR'
    }
}