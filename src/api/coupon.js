import { toast } from 'react-toastify';
import api from '../lib/api';

export const applyCoupon = async ({code, userId, total}) => {
    try {
        const response = await api.post('/coupon/validate', {code, userId, orderAmount: total});
        if(response.status === 200){
            toast.success("Coupon Applied successfully")
            return response.data;
        }
    } catch (error) {
        toast.error(error.response ? error.response.data.message : "Something Went Wrong!");
        return null;
    }
};