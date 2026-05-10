// import { Login_User } from "../models/login_user";
// import { Signup_User } from "../models/signup_user";
// import { User } from "../models/user";
// import axios from "axios";



// export const getUsers = async (): Promise<User[]> => {
//     try {
//         const response = await axios.get('http://localhost:8080/api/user/users');
//         console.log('get user by id function secceeded');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }

// export const getUserById = async (id: number): Promise<User> => {
//     try {
//         const response = await axios.get(`http://localhost:8080/api/user/getUserById/${id}`);
//         console.log('get user by id function secceeded');
//         return response.data;
//     } catch (error) {
//         throw (error);
//     }
// }



// export const login = async (user: Login_User) => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/user/login', user, {
//             validateStatus: (status) => {
//                 return status === 200 || status === 404 || status === 401;
//             }
//         });
//         console.log('login user function succeeded');
//         return { status: response.status, data: response.data }
//     } catch (error: any) {
//         throw (error);
//     }
// }

// export const signUp = async (user: Signup_User) => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/user/signUp', user,{
//             validateStatus: (status) => {
//                 return status === 404 || status === 409 || status===201
//             }
//         });
//         console.log('signUp user function succeeded');
//         return { status: response.status, data: response.data }
//     } catch (error: any) {
//         throw (error);

//     }
// }





import { Login_User } from "../models/login_user";
import { Signup_User } from "../models/signup_user";
import { User } from "../models/user";
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8080/api/';
const axiosInstance = axios.create({
    withCredentials: true,
  });


export const getUserById = async (id: number): Promise<User> => {
    try {
        const response = await axiosInstance.get(`getUserById/${id}`);
        console.log('get user by id function secceeded');
        return response.data;
    } catch (error) {
        throw (error);
    }
}



export const signin = async (user: Login_User) => {
    try {
        const response = await axiosInstance.post('user/signin', user, {
            // validateStatus: (status) => {
            //     return status === 200 || status === 404 || status === 401;
            // }
        });
        console.log('login user function succeeded');
        return { status: response.status, data: response.data }
    } catch (error: any) {
        throw (error);
    }
}

export const signup = async (user: Signup_User) => {
    try {
        const response = await axiosInstance.post('user/signup', user,{
            // validateStatus: (status) => {
            //     return status === 404 || status === 409 || status===201
            // }
        });
        console.log('signUp user function succeeded');
        return { status: response.status, data: response.data }
    } catch (error: any) {
        throw (error);

    }
}



export const signout=async ()=>{
    try{
        const response = await axiosInstance.post('user/signout')
        return {data: response.data, status: response.status}
    } catch (error: any) {
        throw (error);

    }
}