// import axios from "axios";
// import { RecipeBook } from "../models/recipeBook";
// import { User } from "../models/user";



// export const getRecipeBooks = async (): Promise<RecipeBook[]> => {
//     try {
//         const response = await axios.get('http://localhost:8080/api/recipe_book/recipe_books');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const getRecipeBookById = async (id: number): Promise<RecipeBook> => {
//     try {
//         const response = await axios.get(`http://localhost:8080/api/recipe_book/getRecipe_BookById/${id}`);
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const deleteRecipeBook = async (id: number) => {
//     try {
//         const response = await axios.delete(`http://localhost:8080/api/recipe_book/deleteRecipe_Book/${id}`);
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const addRecipeBook = async (recipe_book:RecipeBook)  => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/recipe_book/addRecipe_Book', recipe_book);
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const updateRecipeBook = async (id: number, recipe_book: RecipeBook):Promise<RecipeBook> => {
//     try {
//         const response = await axios.put(`http://localhost:8080/api/recipe_book/updaetRecipe_Book/${id}`, recipe_book);
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }





import axios from "axios";
import { RecipeBook } from "../models/recipeBook";
import { User } from "../models/user";

axios.defaults.baseURL = 'http://localhost:8080/api/';
const axiosInstance = axios.create({
    withCredentials: true,
  });


export const getRecipeBooks = async (): Promise<RecipeBook[]> => {
    try {
        const response = await axiosInstance.get('recipe_book/recipe_books');
        console.log('get recipe_book function secceeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const getRecipeBookByUserId = async (id: number): Promise<RecipeBook[]> => {
    try {
        const response = await axiosInstance.get(`recipe_book/getRecipeBooksByUserId/${id}`);
        console.log('get recipe_book by id function secceeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}




export const deleteRecipeBook = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`recipe_book/deleteRecipe_Book/${id}`);
        console.log('recipe_book delete function succeeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const addRecipeBook = async (recipe_book:RecipeBook)  => {
    try {
        const response = await axiosInstance.post('recipe_book/addRecipe_Book', recipe_book);
        console.log('add recipe_book function succeeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const updateRecipeBook = async (id: number, recipe_book: RecipeBook):Promise<RecipeBook> => {
    try {
        const response = await axiosInstance.put(`recipe_book/updaetRecipe_Book/${id}`, recipe_book);
        console.log('upate recipe_book function succeeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}


