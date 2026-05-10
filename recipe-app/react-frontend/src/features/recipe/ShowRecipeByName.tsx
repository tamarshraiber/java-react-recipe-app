import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/api';
import { fetchRecipes, DeleteRecipe } from './recipeSlice';
import { fetchCategories } from '../category/categorySlice';
import { Recipe } from '../../models/recipe';
import { Category } from '../../models/category';
import { Button, Card, CardContent, Grid, Typography, FilledInput, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddCategory } from "../category/categorySlice";

const ShowRecipeByName = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const recipeBookId = useSelector((state: RootState) => state.recipeBook.recipeBookId);
  const recipes = useSelector((state: RootState) => state.recipe.recipes);

  const [nameCategory, setNameCategory] = useState(''); // שדה הוספת קטגוריה חדשה
  const [add, setAdd] = useState<boolean>(false);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes());
    }
  }, [dispatch]);


  const deleteRecipe = (id: number) => {
    dispatch(DeleteRecipe(id));
  };

  const addRecipe = () => {
    navigate('/addRecipe');
  };

  const addCategory = () => {
    if (!nameCategory) return;

    const newCategory: Category = {
      name: nameCategory,
      recipeBook: { id: recipeBookId },
      recipes: 'null',
      id: 0
    };
    dispatch(AddCategory(newCategory));
    setNameCategory('');
    setAdd(false);
  };


  return (
    <div>
      <div style={{ padding: '20px', width: '80vw', height: 'calc(100vh - 10vh)', marginTop: '3vh', overflowY: 'auto', }}>
        <style>
          {`
      ::-webkit-scrollbar {
        display: none;
      }
    `}
        </style>
        <Grid container spacing={3} justifyContent="center" sx={{ opacity: 0.75 }}>
          {recipes
            .filter((r) => r.recipeBook?.id === recipeBookId)
            .map((r) => (
              <Grid item xs={12} sm={6} md={4} key={r.id}>
                <Card
                  style={{
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" align="center">
                      {r.name}
                    </Typography>
                    <Grid container justifyContent="center" spacing={2} style={{ marginTop: '10px' }}>
                      <Grid item>
                        <Button sx={{ textTransform: 'none' }}
                          variant="contained"
                          color="primary"
                          onClick={() => navigate('/showRecipe', { state: { id: r.id } })}
                          fullWidth
                        >
                          show recipe
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button sx={{ textTransform: 'none' }}
                          variant="outlined"
                          color="secondary"
                          onClick={() => deleteRecipe(r.id)}
                          fullWidth
                        >
                          ❌ Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
      <div style={{ position: 'absolute', left: '1.5vw', top: '5vh' }}>

        <Grid container spacing={2} direction="column" alignItems="flex-start" style={{ marginTop: '30px', left: '0vw', top: '2vh', widows: '6vw' }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', width: '7vw' }}
              onClick={() => addRecipe()}
            >
              add recipe
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', width: '7vw' }}
              onClick={() => navigate('/category')}
            >
              category
            </Button>
          </Grid>


          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', width: '7vw' }}
              onClick={() => navigate('/showByImage')}
            >
              filter to image
            </Button>
          </Grid>

          {add ? (
            <Grid item>
              <FilledInput
                fullWidth
                placeholder="name of category"
                onChange={(e) => setNameCategory(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none' }}
                onClick={addCategory}
              >
                ✅ addition
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button
                variant="contained"
                // color="primary"
                sx={{ textTransform: 'none', width: '7vw' }}
                onClick={() => setAdd(true)}
              >
                add category
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              sx={{ textTransform: 'none' }}
              onClick={() => navigate('/recipeBook')}
            >
              back ⬅️
            </Button>
          </Grid>
        </Grid>

      </div>
    </div>
  );
};

export default ShowRecipeByName;