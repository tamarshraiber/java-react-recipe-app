import React, { useEffect, useState } from "react";
import { Category } from '../../models/category';
import { AddCategory, DeleteCategory, UpdateCategory } from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/api";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Typography, List, ListItem, ListItemText, Box, Stack, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchCategories } from './categorySlice'

const CategoryComp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const recipeBookId = useSelector((state: RootState) => state.recipeBook?.recipeBookId);
    const categories = useSelector((state: RootState) => state.category.categories);

    const [nameCategory, setNameCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState<number>(-1);
    const [updatedName, setUpdatedName] = useState('');
    const [idCategory, setIdCategory] = useState<number>();
    const [open, setOpen] = useState(false);

    const isCategory = useSelector((state: RootState) => state.category.isCategory)

    useEffect(() => {
        if (!isCategory) {
            dispatch(fetchCategories());
        }
    }, [dispatch]);

    // הוספת קטגוריה
    const handleAdd = () => {
        if (!nameCategory.trim()) return;

        const newCategory: Category = {
            name: nameCategory,
            recipeBook: { id: recipeBookId },
            recipes: 'null',
            id: 0
        };

        dispatch(AddCategory(newCategory));
        setNameCategory('');
    };

    // עריכת קטגוריה
    const handleEdit = (id: number, currentName: string) => {
        setEditingCategory(id);
        setUpdatedName(currentName);
    };

    // עדכון קטגוריה
    const handleUpdate = (idCategory: number) => {
        const updateCategory: Category = {
            name: updatedName,
            id: editingCategory,
            recipeBook: { id: recipeBookId },
        };

        dispatch(UpdateCategory({ id: idCategory, category: updateCategory })).then(() => {
            setEditingCategory(-1);
            setUpdatedName('');
        });
    };

    // מחיקת קטגוריה
    const handleDelete = (id: number) => {
        setIdCategory(id);
        setOpen(true);
    };

    const handleClose = async (result: boolean) => {
        if (result && idCategory) {
            dispatch(DeleteCategory(idCategory));
        }
        setOpen(false);
    };

    return (
        <Box sx={{ p: 4 }}>
            {/* כותרת */}
            <Typography variant="h4" gutterBottom align="center">
                Categories Management
            </Typography>

            {/* הוספת קטגוריה */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mb={4}>
                <TextField
                    label="Category Name"
                    variant="outlined"
                    value={nameCategory}
                    onChange={(e) => setNameCategory(e.target.value)}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    sx={{ height: '55px' }}
                >
                    Add
                </Button>
            </Stack>

            {/* רשימת קטגוריות */}
            <List>
                {categories &&
                    categories.filter((c: Category) => c.recipeBook?.id === recipeBookId).map((c: Category) => (
                        <ListItem
                            key={c.id}
                            secondaryAction={
                                <Stack direction="row" spacing={1}>
                                    {editingCategory === c.id ? (
                                        <>
                                            <TextField
                                                value={updatedName}
                                                onChange={(e) => setUpdatedName(e.target.value)}
                                                variant="standard"
                                            />
                                            <Button variant="contained" color="primary" onClick={() => handleUpdate(c.id)}>Save</Button>
                                            <Button variant="outlined" color="secondary" onClick={() => setEditingCategory(-1)}>Cancel</Button>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton edge="end" color="primary" onClick={() => handleEdit(c.id, c.name)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" color="error" onClick={() => handleDelete(c.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </Stack>
                            }
                        >
                            <h3>{c.name}</h3>

                        </ListItem>
                    ))}
            </List>

            {/* דיאלוג מחיקה */}
            <Dialog open={open} onClose={() => handleClose(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this category? All recipes under this category will be deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="secondary">Cancel</Button>
                    <Button onClick={() => handleClose(true)} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>

            {/* חזרה למסך הקודם */}
            <Box mt={4} textAlign="center">
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/recipeBook')}
                >
                    Back
                </Button>
            </Box>
        </Box>
    );
};

export default CategoryComp;
