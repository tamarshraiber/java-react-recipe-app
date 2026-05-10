import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/api';
import { Box, Typography, Button, Grid, Paper, Checkbox, FormControlLabel } from '@mui/material';

const ShowRecipeComp = () => {
  const location = useLocation();
  const { id } = location.state || {}; // id of recipe to show

  const navigate = useNavigate();

  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const recipe = recipes.find((r) => r.id == id);


  const steps = recipe?.methodOfPreparation.split('@') || [];
  const productAndQuantity = recipe?.productAndQuantity.split('@') || [];
  const product: string[] = [];
  const quantity: string[] = [];

  productAndQuantity.forEach((item: string, index: number) => {
    if (index % 2 === 0) {
      product.push(item);
    } else {
      quantity.push(item);
    }
  });

  //V button
  const [checkedItemsForProducts, setCheckedItemsForProducts] = useState<boolean[]>(
    new Array(product.length).fill(false)
  );

  const handleCheckboxChangeForProducts = (index: number) => {
    const newCheckedItems = [...checkedItemsForProducts];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItemsForProducts(newCheckedItems);
  };

  const [checkedItemsForSteps, setCheckedItemsForSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );

  const handleCheckboxChangeForSteps = (index: number) => {
    const newCheckedItems = [...checkedItemsForSteps];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItemsForSteps(newCheckedItems);
  };

  const update = () => {
    navigate('/updateRecipe', { state: { id: id } });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        {recipe?.name}
      </Typography>

      <Typography variant="h6" align="center" sx={{ marginBottom: 2, fontSize: '5vh' }}>
        {recipe?.description}
      </Typography>
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <img
          src={recipe?.image ? `data:image/jpeg;base64,${recipe.image}` : '/path/to/default-image.jpg'}
          alt="Recipe"
          style={{
            width: '54vw',
            height: '63vh',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        />
      </Box>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={5}>
          <Paper elevation={3} sx={{ padding: 2, height: '70vh', width: '30vw' }}>
            <Typography variant="h5" gutterBottom>
              Products and Quantities:
            </Typography>
            {quantity.map((q: string, index: number) => (
              <Grid
                item
                xs={12}
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 1,
                  justifyContent: 'flex-start',
                }}
              >
                <Checkbox
                  checked={checkedItemsForProducts[index]}
                  onChange={() => handleCheckboxChangeForProducts(index)}
                  sx={{
                    color: checkedItemsForProducts[index] ? 'green' : 'gray',
                  }}
                />
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  {q}
                </Typography>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  {product[index]}
                </Typography>
              </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3} sx={{ padding: 2, height: '70vh', width: '30vw' }}>
            <Typography variant="h5" gutterBottom>
              Method of Preparation:
            </Typography>
            {steps.map((s: string, index: number) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedItemsForSteps[index]}
                      onChange={() => handleCheckboxChangeForSteps(index)}
                      sx={{
                        color: checkedItemsForSteps[index] ? 'green' : 'gray',
                      }}
                    />
                  }
                  label={<Typography variant="body1" sx={{ marginLeft: 2 }}>{s}</Typography>}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/recipe')}
          sx={{ backgroundColor: '#1976d2', marginBottom: 2 }}
        >
          Back to Recipe List
        </Button>
      </Box>

      <Grid item sx={{ textAlign: 'center' }}>
        <Button
          sx={{ textTransform: 'none', marginTop: '3vh', width: '100%' }}
          variant="outlined"
          onClick={() => update()}
        >
          ✏️ Update Recipe
        </Button>
      </Grid>
    </Box>
  );
};

export default ShowRecipeComp;


















