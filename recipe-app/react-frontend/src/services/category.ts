// import axios from "axios";
// import { Category } from "../models/category";


// export const getCategories = async (): Promise<Category[]> => {
//     try {
//         const response = await axios.get('http://localhost:8080/api/category/categories');
//         console.log('get Categories function secceeded');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const getCategoryById = async (id: number): Promise<Category> => {
//     try {
//         const response = await axios.get(`http://localhost:8080/api/category/getCategoriesById/${id}`);
//         console.log('get Category by id function secceeded');        
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const deleteCategory = async (id: number) => {
//     try {
//         const response = await axios.delete(`http://localhost:8080/api/category/delete/Category/${id}`);
//         console.log('Category delete function succeeded');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const addCategory = async (category:Category) => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/category/addCategory', category);
//         console.log('add Category function succeeded');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const updateCategory = async (id: number, category: Category) => {
//     try {
//         const response = await axios.put(`http://localhost:8080/api/category/updateCategory/${id}`, category);
//         console.log('upate Category function succeeded');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }


// export const deleteCategoryByRecipeBookId=async(idRecipeBook:number)=>{
//     try{
//         const response=await axios.delete(`http://localhost:8080/api/category/deleteCategoryByRecipeBookId/${idRecipeBook}`);
//         return response.data;
//     }catch (error) {
//         throw (error);
//     }
// }


















import axios from "axios";
import { Category } from "../models/category";

axios.defaults.baseURL = 'http://localhost:8080/api/';
const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await axiosInstance.get('category/categories');
        console.log('get Categories function secceeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const getCategoryById = async (id: number): Promise<Category> => {
    try {
        const response = await axiosInstance.get(`category/getCategoriesById/${id}`);
        console.log('get Category by id function secceeded');        
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`category/delete/Category/${id}`);
        console.log('Category delete function succeeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const addCategory = async (category:Category) => {
    try {
        const response = await axiosInstance.post('category/addCategory', category);
        console.log('add Category function succeeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const updateCategory = async (id: number, category: Category) => {
    try {
        const response = await axiosInstance.put(`category/updateCategory/${id}`, category);
        console.log('upate Category function succeeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}


export const deleteCategoryByRecipeBookId=async(idRecipeBook:number)=>{
    try{
        const response=await axiosInstance.delete(`category/deleteCategoryByRecipeBookId/${idRecipeBook}`);
        return response.data;
    }catch (error) {
        throw (error);
    }
}






