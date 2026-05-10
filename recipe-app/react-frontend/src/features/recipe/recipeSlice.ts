import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Recipe } from '../../models/recipe';
import { getRecipes, getRecipeById, deleteRecipe, updateRecipe, addRecipe, upload1, deleteRecipeByCategoryId, deleteRecipeByRecipeBookId } from '../../services/recipe';
import { UpdateRecipe1 } from '../../models/updateRecipe';

const initialState = {
    recipes: [{} as Recipe],
    // selecteRecipe: {} as Recipe,
    error: "",
    statusAdd: -1,
    selectedRecipe: {} as Recipe
};

export const fetchRecipes = createAsyncThunk(
    'recipe/fetchRecipes',
    async () => {
        const recipes = await getRecipes();
        return recipes;
    }
);

export const fetchRecipeById = createAsyncThunk(
    'recipe/fetchRecipeById',
    async (id: number) => {
        const recipeById = await getRecipeById(id);
        return recipeById;
    }
);

export const DeleteRecipe = createAsyncThunk(
    'recipe/DeleteRecipe',
    async (id: number) => {
        await deleteRecipe(id);
        return id;
    }
);



export const AddRecipe = createAsyncThunk(
    'recipe/RecipeAdd',
    async (recipe: Recipe) => {
        const newRecipe = await addRecipe(recipe);
        return newRecipe;
    }
);

export const UpdateRecipe = createAsyncThunk(
    'recipe/UpdateRecipe',
    async ({ id, updatedRecipe }: { id: number, updatedRecipe: Recipe }) => {
        const data = await updateRecipe(id, updatedRecipe);
        return data;
    }
);


export const upload = createAsyncThunk(
    'recipe/upload',
    async ({ recipe, file }: { recipe: Recipe, file: File }) => {
        try {
            const newRecipe = await upload1({ recipe, file });
            return newRecipe;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteRecipeByCategory = createAsyncThunk(
    'recipe/deleteRecipeByCategory',
    async (idCategory: number) => {
        await deleteRecipeByCategoryId(idCategory)
        return idCategory;
    }
);

export const deleteRecipeByRecipeBook = createAsyncThunk(
    'recipe/deleteRecipeByRecipeBook',
    async (idRecipeBook: number) => {
        await deleteRecipeByRecipeBookId(idRecipeBook)
        return idRecipeBook;
    }
)


export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.recipes = action.payload;
        });
        builder.addCase(fetchRecipes.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch recipes";
        });

        builder.addCase(fetchRecipeById.fulfilled, (state, action) => {
            console.log('1111');
            state.selectedRecipe = action.payload;
        });
        builder.addCase(fetchRecipeById.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch recipe by id";
        });

        builder.addCase(DeleteRecipe.fulfilled, (state, action) => {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
        });
        builder.addCase(DeleteRecipe.rejected, (state, action) => {
            state.error = action.error.message || "Failed to delete recipe";
        });

        builder.addCase(deleteRecipeByCategory.fulfilled, (state, action) => {
            state.recipes = state.recipes.filter(recipe => recipe.category?.id !== action.payload);
        });
        builder.addCase(deleteRecipeByCategory.rejected, (state, action) => {
            state.error = action.error.message || "faild delete recipe by category id"
        });

        builder.addCase(deleteRecipeByRecipeBook.fulfilled, (state, action) => {
            state.recipes = state.recipes.filter(recipe => recipe.recipeBook?.id !== action.payload)
        });
        builder.addCase(deleteRecipeByRecipeBook.rejected, (state, action) => {
            state.error = action.error.message || "faild delete recipe by recipe book id"
        });

        builder.addCase(AddRecipe.fulfilled, (state, action) => {
            state.recipes.push(action.payload.data);
            state.statusAdd = action.payload.status;
        });
        builder.addCase(AddRecipe.rejected, (state, action) => {
            state.error = action.error.message || "Failed to add recipe";
        });

        builder.addCase(upload.fulfilled, (state, action) => {
            const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
            if (index !== -1) {
                state.recipes[index] = action.payload;
            }
        });
        builder.addCase(upload.rejected, (state, action) => {
            state.error = action.error.message || "Failed to upload recipe";
        });

        builder.addCase(UpdateRecipe.fulfilled, (state, action) => {
            const index = state.recipes.findIndex(recipe => recipe.id === action.payload.data.id);
            if (index !== -1) {
                state.recipes[index] = action.payload.data;
            }
        });
        builder.addCase(UpdateRecipe.rejected, (state, action) => {
            state.error = action.error.message || "Failed to update recipe";
        });
    }
});

export default recipeSlice.reducer;
