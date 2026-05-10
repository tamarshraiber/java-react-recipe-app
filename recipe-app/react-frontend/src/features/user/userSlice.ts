
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { User } from '../../models/user';
// import { getUsers, login, signUp, getUserById } from '../../services/user';
// import { Login_User } from '../../models/login_user';
// import { Signup_User } from '../../models/signup_user';
// import { RecipeBook } from '../../models/recipeBook';


// const initialState = {
//     users: [{} as User],
//     selectUser: {} as User,
//     recipeBooks: [{} as RecipeBook],
//     userId: { id: -1 },
//     isConect: false,
//     error: "",
// };

// export const fetchUser = createAsyncThunk(
//     'user/fetchUser',
//     async () => {
//         const users = await getUsers();
//         return users;
//     }
// );

// export const fetchUserById = createAsyncThunk(
//     'user/fetchUserById',
//     async (id: Number) => {
//         const userById = await getUserById(id);
//         return userById;
//     }
// );

// export const Login = createAsyncThunk(
//     'user/Login',
//     async (user: Login_User) => {
//         const users = await login(user);
//         return users;
//     }
// );


// export const SignUp = createAsyncThunk(
//     'user/SignUp',
//     async (user: Signup_User) => {
//         const users = await signUp(user);
//         return users;
//     }
// );

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         logOut(state) {
//             state.selectUser = {} as User;
//             state.error = "";
//             state.isConect = false;
//             state.userId = { id: -1 };
//             state.recipeBooks =  [{} as RecipeBook] ;
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchUser.fulfilled, (state, action) => {
//             state.users = action.payload;
//         });
//         builder.addCase(fetchUser.rejected, (state, action) => {
//             state.error = action.error.message || "Failed to fetch users";
//         });

//         builder.addCase(fetchUserById.fulfilled, (state, action) => {
//             state.selectUser = action.payload;
//         });
//         builder.addCase(fetchUserById.rejected, (state, action) => {
//             state.error = action.error.message || "Failed to fetch user by id";
//         });

//         builder.addCase(Login.fulfilled, (state, action) => {
//             state.selectUser = action.payload.data;
//             state.userId = { id: action.payload.data.id };
//             state.isConect = true;
//         });
//         builder.addCase(Login.rejected, (state, action) => {
//             state.error = action.error.message || "Failed to login user";
//         });

//         builder.addCase(SignUp.fulfilled, (state, action) => {
//             state.selectUser = action.payload.data;
//             state.isConect = true;
//         });
//         builder.addCase(SignUp.rejected, (state, action) => {
//             state.error = action.error.message || "Failed to login user";
//         });
//     }
// });

// export const { logOut } = userSlice.actions;
// export default userSlice.reducer;













import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import { signin, signout, signup, getUserById } from '../../services/user';
import { Login_User } from '../../models/login_user';
import { Signup_User } from '../../models/signup_user';
import { RecipeBook } from '../../models/recipeBook';


const initialState = {
    users: [{} as User],
    selectUser: {} as User,
    recipeBooks: [{} as RecipeBook],
    userId: { id: -1 },
    isConect: false,
    error: "",
};


export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (id: number) => {
        const userById = await getUserById(id);
        return userById;
    }
);

export const Login = createAsyncThunk(
    'user/Login',
    async (user: Login_User) => {
        const users = await signin(user);
        return users;
    }
);


export const SignUp = createAsyncThunk(
    'user/SignUp',
    async (user: Signup_User) => {
        const users = await signup(user);
        return users;
    }
);

export const LogOut=createAsyncThunk(
    'user/LogOut',
    async ()=>{
        const response=await signout();
        return response;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut(state) {
            LogOut();
            state.selectUser = {} as User;
            state.error = "";
            state.isConect = false;
            state.userId = { id: -1 };
            state.recipeBooks =  [{} as RecipeBook] ;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.selectUser = action.payload;
        });
        builder.addCase(fetchUserById.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch user by id";
        });

        builder.addCase(Login.fulfilled, (state, action) => {
            state.selectUser = action.payload.data;
            state.userId = { id: action.payload.data.id };
            state.isConect = true;
        });
        builder.addCase(Login.rejected, (state, action) => {
            state.error = action.error.message || "Failed to login user";
        });

        builder.addCase(SignUp.fulfilled, (state, action) => {
            state.selectUser = action.payload.data;
            state.isConect = true;
        });
        builder.addCase(SignUp.rejected, (state, action) => {
            state.error = action.error.message || "Failed to login user";
        });

        builder.addCase(LogOut.fulfilled, (state, action) => {
            state.selectUser = action.payload.data;
            state.isConect = false;
        });
        builder.addCase(LogOut.rejected, (state, action) => {
            state.error = action.error.message || "Failed to login user";
        });
    }
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
