import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RecipeBook } from '../../models/recipeBook';
import { getRecipeBooks, getRecipeBookByUserId, deleteRecipeBook, updateRecipeBook, addRecipeBook } from '../../services/recipeBook';
import { User } from '../../models/user';

const initialState = {
    recipeBooks:  [{} as RecipeBook],
    selectRecipeBooks: {} as RecipeBook,
    recipeBookByUserId: [{} as RecipeBook],
    user:{id:-1},
    error: "",
    recipeBookId:-1,
    isRecipeBook:false,
};

export const fetchRecipeBooks = createAsyncThunk(
    'recipeBooks/fetchRecipeBooks',
    async () => {
        const recipeBooks = await getRecipeBooks();
        return recipeBooks;
    }
);

export const fetchRecipeBookByUserId = createAsyncThunk(
    'recipeBook/fetchRecipeBookById',
    async (id: number) => {
        const recipeBookByUserId = await getRecipeBookByUserId(id);
        return recipeBookByUserId;
    }
);

export const DeleteRecipeBook = createAsyncThunk(
    'recipeBook/DeleteRecipeBook',
    async (id: number) => {
        await deleteRecipeBook(id);
        return id;
    }
);

export const AddRecipeBook = createAsyncThunk(
    'recipeBook/RecipeBookAdd',
    async (recipeBook: RecipeBook) => {
        const newRecipeBook = await addRecipeBook(recipeBook);
        return newRecipeBook;
    }
);

export const UpdateRecipeBook = createAsyncThunk(
    'recipeBooks/UpdateRecipeBook',
    async (recipeBookUpdate: { id: number, recipeBook: RecipeBook }) => {
        const updatedRecipeBook = await updateRecipeBook(recipeBookUpdate.id, recipeBookUpdate.recipeBook);
        return updatedRecipeBook;
    }
);


export const recipeBookSlice = createSlice({
    name: 'recipBook',
    initialState,
    reducers: {
        setRecipeBookId: (state, action) => {
            state.recipeBookId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecipeBooks.fulfilled, (state, action) => {
            state.recipeBooks = action.payload;
            
        });
        builder.addCase(fetchRecipeBooks.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch recipeBook";
        });

        builder.addCase(fetchRecipeBookByUserId.fulfilled, (state, action) => {
            state.recipeBookByUserId = action.payload;
            
        });
        builder.addCase(fetchRecipeBookByUserId.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch recipeBook";
        });

        builder.addCase(DeleteRecipeBook.fulfilled, (state, action) => {
            state.recipeBooks = state.recipeBooks.filter(recipeBook => recipeBook.id !== action.payload);
        });
        builder.addCase(DeleteRecipeBook.rejected, (state, action) => {
            state.error = action.error.message || "Failed to delete recipeBook";
        });
        builder.addCase(AddRecipeBook.fulfilled, (state, action) => {
            state.recipeBooks.push(action.payload);
        });
        builder.addCase(AddRecipeBook.rejected, (state, action) => {
            state.error = action.error.message || "Failed to add recipeBook";
        });
        builder.addCase(UpdateRecipeBook.fulfilled, (state, action) => {
            const index = state.recipeBooks.findIndex(recipeBook => recipeBook.id === action.payload.id);
            if (index !== -1) {
                state.recipeBooks[index] = action.payload;
            }
        });
        builder.addCase(UpdateRecipeBook.rejected, (state, action) => {
            state.error = action.error.message || "Failed to update recipeBook";
        });
    }
});


export const {setRecipeBookId} =recipeBookSlice.actions;
export default recipeBookSlice.reducer;
