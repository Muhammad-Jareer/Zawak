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

export const cancelOrder = async (id) => {
    console.log("id is: ", id)
    if(!id) return
    console.log("making request to: ", `/order/${id}/cancel`)
    try {
        const response = await api.patch(`/order/${id}/cancel`);
        if(response.data.status){
            return true
        }
        console.log("res is: ", response.data)
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
        return false
    }
};
