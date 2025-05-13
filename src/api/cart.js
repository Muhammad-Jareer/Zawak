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
        const response = await api.delete(`/cart/remove-from-cart`, {data: {itemToDelId: item}});
        if(response.status === 200){
            toast.success("Item removed from cart!")
            return true
        }
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
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
