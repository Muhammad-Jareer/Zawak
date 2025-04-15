import { toast } from 'react-toastify';
import api from '../lib/api';

export const getAllProducts = async (skip, limit) => {
    try {
        const response = await api.get(`/product/gps?skip=${skip}&limit=${limit}`);
        if(response.status === 200){
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error)
    }
};


export const getProductDetails = async (id) => {
    try {
        const response = await api.get(`/product/gp?id=${id}`);
        if(response.status === 200){
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error)
    }
};

export const getFilteredProducts = async (category, subCategory, tag, minPrice, maxPrice, sortBy,skip, limit) => {
    try {
        const response = await api.get(`/product/fp?category=${category}&subCategory=${subCategory}&tag=${tag}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}&skip=${skip}&limit=${limit}`);
        console.log("response is: ", response)
        if(response.status === 200){
            console.log(response.data)
            return response.data;
        }
    } catch (error) {
        console.log(error)
        toast.error("Filters Not Applied")
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