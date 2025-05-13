import { toast } from 'react-toastify';
import api from '../lib/api';

export const api_saveAddress = async (address) => {
    try {
        const response = await api.post('/user/save-address', {address});
        if(response.status === 200){
            toast.success("Address saved successfully")
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
};