import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import recipeBookSlice from "../features/recipeBook/recipeBookSlice";
import recipeSlice from "../features/recipe/recipeSlice";
import categorySlice, { CategorySlice } from "../features/category/categorySlice";

export const store=configureStore({
    reducer: {
        user:userSlice,
        recipeBook:recipeBookSlice,
        recipe:recipeSlice,
        category:categorySlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch