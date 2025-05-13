import { toast } from 'react-toastify';
import api from '../lib/api';

export const api_generateUrl = async (address) => {
    try {
        const response = await api.post('/payment/generate-upload-url', {address});
        if(response.status === 200){
            return response.data
        }
        return false
    } catch (error) {
        toast.error(error.response.data.message)
        return false
    }
};