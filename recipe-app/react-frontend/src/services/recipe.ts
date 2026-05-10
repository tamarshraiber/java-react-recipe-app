// import axios from "axios";
// import { Recipe } from '../models/recipe';


// export const getRecipes = async (): Promise<Recipe[]> => {
//     try {
//         const response = await axios.get('http://localhost:8080/api/recipe/recipes');
//         console.log('get recipes function secceeded');        
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const getRecipeById = async (id: number): Promise<Recipe> => {
//     try {
//         const response = await axios.get(`http://localhost:8080/api/recipe/getRecipeById/${id}`);        
//         console.log('get recipe by id function secceeded');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const deleteRecipe = async (id: number) => {
//     try {
//         const response = await axios.delete(`http://localhost:8080/api/recipe/deleteRecipe/${id}`);
//         console.log('recipe delete function succeeded');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const addRecipe = async (recipe:Recipe) => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/recipe/addRecipe', recipe);
//         console.log('add recipe function succeeded');
//         return {data:response.data, status:response.status};
//     } catch (error) {
//         throw (error);
//     }
// }

// export const updateRecipe = async (id: number, recipe: Recipe) => {
//     try {
//         const response = await axios.put(`http://localhost:8080/api/recipe/updaetRecipe/${id}`, recipe);
//         console.log('upate recipe function succeeded');
//         return{ data:response.data, status:response.status};
//     } catch (error) {
//         throw (error);
//     }
// }

// export const upload1=async({recipe,file}:{recipe: Recipe, file:File})=>{
//     try{
//         const fromData=new FormData();
//         fromData.append("recipe",JSON.stringify(recipe));
//         fromData.append("image",file)
//         const response=await axios.post('http://localhost:8080/api/recipe/upload',fromData);
//         console.log('add recipe and image function succeed');
//         return response.data;
//     }catch (error) {
//         throw (error);
//     }
// }


// export const deleteRecipeByCategoryId=async(idCategory:number)=>{
//     try{
//         const response=await axios.delete(`http://localhost:8080/api/recipe/deleteRecipeByCategoryId/${idCategory}`);
//         console.log('delete recipe by category id succeed');
//         return response.data;
//     }catch (error) {
//         throw (error);
//     }
// }


// export const deleteRecipeByRecipeBookId=async(idRecipeBook:number)=>{
//     try{
//         const response=await axios.delete(`http://localhost:8080/api/recipe/deleteRecipeByRecipeBookId/${idRecipeBook}`);
//         console.log('dekete recipe by recipeBook ID SUCCEED');
//         return response.data;
//     }catch (error) {
//         throw (error);
//     }
// }

















import axios from "axios";
import { Recipe } from '../models/recipe';

axios.defaults.baseURL = 'http://localhost:8080/api/';
const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await axiosInstance.get('recipe/recipes');
        console.log('get recipes function secceeded');        
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const getRecipeById = async (id: number): Promise<Recipe> => {
    try {
        const response = await axiosInstance.get(`recipe/getRecipeById/${id}`);        
        console.log('get recipe by id function secceeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const deleteRecipe = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`recipe/deleteRecipe/${id}`);
        console.log('recipe delete function succeeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const addRecipe = async (recipe:Recipe) => {
    try {
        const response = await axiosInstance.post('recipe/addRecipe', recipe);
        console.log('add recipe function succeeded');
        return {data:response.data, status:response.status};
    } catch (error) {
        throw (error);
    }
}

export const updateRecipe = async (id: number, recipe: Recipe) => {
    try {
        const response = await axiosInstance.put(`recipe/updaetRecipe/${id}`, recipe);
        console.log('upate recipe function succeeded');
        return{ data:response.data, status:response.status};
    } catch (error) {
        throw (error);
    }
}

export const upload1=async({recipe,file}:{recipe: Recipe, file:File})=>{
    try{
        const fromData=new FormData();
        fromData.append("recipe",JSON.stringify(recipe));
        fromData.append("image",file)
        const response=await axiosInstance.post('recipe/upload',fromData);
        console.log('add recipe and image function succeed');
        return response.data;
    }catch (error) {
        throw (error);
    }
}


export const deleteRecipeByCategoryId=async(idCategory:number)=>{
    try{
        const response=await axiosInstance.delete(`recipe/deleteRecipeByCategoryId/${idCategory}`);
        console.log('delete recipe by category id succeed');
        return response.data;
    }catch (error) {
        throw (error);
    }
}


export const deleteRecipeByRecipeBookId=async(idRecipeBook:number)=>{
    try{
        const response=await axiosInstance.delete(`recipe/deleteRecipeByRecipeBookId/${idRecipeBook}`);
        console.log('dekete recipe by recipeBook ID SUCCEED');
        return response.data;
    }catch (error) {
        throw (error);
    }
}


