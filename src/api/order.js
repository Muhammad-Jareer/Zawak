import { toast } from 'react-toastify';
import api from '../lib/api';

export const placeOrder = async (order) => {
    try {
        const response = await api.post(`/order/make-order`, {...order});
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        if(error.response.data.message === 'jwt expired'){
            return 'NOT_AUTHENTICATED'
        }
        console.log(error)
        toast.error("Something went wrong!")
    }
};

export const getUserOrders = async (id) => {
    try {
        const response = await api.get(`/order/user-orders?userId=${id}`);
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        if(error.response.data.message === 'jwt expired'){
            return 'NOT_AUTHENTICATED'
        }
        console.log(error)
        toast.error("Something went wrong!")
    }
};
