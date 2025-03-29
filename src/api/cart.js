import { toast } from 'react-toastify';
import api from '../lib/api';

export const addItemToCart = async (item) => {
    try {
        item.quantity = 1;
        const response = await api.post(`/cart/add-to-cart`, {itemToAdd: item});
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        if(error.response.status === 401){
            console.log("redirecting.. ")
            return 401
        }
        console.log(error)
        toast.error("Something went wrong!")
    }
};

export const getCart = async (item) => {
    try {
        const response = await api.get(`/cart/get-cart`);
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
    }
};

export const removeItemFromCart = async (item) => {
    try {
        const response = await api.delete(`/cart/remove-from-cart`, {itemToDelId: item});
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        if(error.response.status === 401){
            console.log("redirecting.. ")
            return 401
        }
        console.log(error)
        toast.error("Something went wrong!")
    }
};
