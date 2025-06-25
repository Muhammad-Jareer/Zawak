import { toast } from 'react-toastify';
import api from '../lib/api';

export const addItemToCart = async (item) => {
    try {
        let itemToAdd = {...item, quantity: 1}; // Ensure item has a quantity
        const response = await api.post(`/cart/add-to-cart`, {itemToAdd});
        if(response.status === 200){
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error)
        if(error?.response.status === 401){
            console.log("redirecting.. ")
            return false;
        }
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
    }
};

export const removeItemFromCart = async (item) => {
    try {
        const response = await api.delete(`/cart/remove-from-cart`, {data: {itemToDelId: item}});
        if(response.status === 200){
            return true
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};

export const api_updateQuantity = async (itemId, operation) => {
    try {
        const response = await api.post(`/cart/update-quantity`, {itemId, operation});
        if(response.status === 200){
            toast.success("Quantity updated successfully!")
            return true
        }
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
        return false
    }
}
