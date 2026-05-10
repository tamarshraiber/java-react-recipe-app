import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../models/category';
import { getCategories, getCategoryById, deleteCategory, updateCategory, addCategory, deleteCategoryByRecipeBookId } from '../../services/category';


const initialState = {
    categories: [{} as Category],
    selectedCategory: {} as Category,
    selecteRecipe: {
        name: 'null', recipes: 'null', id: -1
    },
    error: "",
    isCategory: false,
};
export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async () => {
        const Categories = await getCategories();
        return Categories;
    }
);

export const fetchCategoryById = createAsyncThunk(
    'category/fetchCategoryById',
    async (id: number) => {
        const CategoryById = await getCategoryById(id);
        return CategoryById;
    }
);

export const DeleteCategory = createAsyncThunk(
    'category/DeleteCategory',
    async (id: number) => {
        await deleteCategory(id);
        return id;
    }
);

export const deleteCategoryByRecipeBook = createAsyncThunk(
    'category/deleteCategoryByRecipeBook',
    async (idRecipeBook: number) => {
        await deleteCategoryByRecipeBookId(idRecipeBook);
        return idRecipeBook;
    }
)

export const AddCategory = createAsyncThunk(
    'category/AddCategory',
    async (category: Category) => {
        const newCategory = await addCategory(category);
        return newCategory;
    }
);

export const UpdateCategory = createAsyncThunk(
    'updateCategory/UpdateCategory',
    async ({ id, category }: { id: number, category: Category }) => {
        const updatedCategory = await updateCategory(id, category);
        return updatedCategory;
    }
);

export const CategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.isCategory = true;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch categories";
        });

        builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
            state.selectedCategory = action.payload;
        });
        builder.addCase(fetchCategoryById.rejected, (state, action) => {
            state.error = action.error.message || "Failed to fetch Category by id";
        });

        builder.addCase(DeleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        });
        builder.addCase(DeleteCategory.rejected, (state, action) => {
            state.error = action.error.message || "Failed to delete Category";
        });
        builder.addCase(deleteCategoryByRecipeBook.fulfilled, (state, action) => {
            state.categories = state.categories.filter(category => category.recipeBook?.id !== action.payload);
        });
        builder.addCase(deleteCategoryByRecipeBook.rejected, (state, action) => {
            state.error = action.error.message || "faild ro delete category by recipe book id";
        });

        builder.addCase(AddCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload);
        });
        builder.addCase(AddCategory.rejected, (state, action) => {
            state.error = action.error.message || "Failed to add Category";
        });

        builder.addCase(UpdateCategory.fulfilled, (state, action) => {
            const index = state.categories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        });
        builder.addCase(UpdateCategory.rejected, (state, action) => {
            state.error = action.error.message || "Failed to update Category";
        });
    }
});

export default CategorySlice.reducer;
