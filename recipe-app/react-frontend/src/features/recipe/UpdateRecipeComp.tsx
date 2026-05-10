import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { fetchRecipeById, UpdateRecipe, upload } from '../recipe/recipeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { fetchCategories } from '../category/categorySlice';

const UpdateRecipeComp = () => {
    const location = useLocation();
    const { id } = location?.state || {};

    const dispatch = useDispatch<AppDispatch>();
    const navigate=useNavigate();

    const recipe = useSelector((state: RootState) => state.recipe.selectedRecipe);
    const categories = useSelector((state: RootState) => state.category.categories);
    const isCategory = useSelector((state: RootState) => state.category.isCategory)
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [error, setError] = useState(false)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState(['']);
    const [productAndQuantity, setProductAndQuantity] = useState(['']);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(-1);
    const [imageName, setImageName] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const slideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!isCategory)
            dispatch(fetchCategories());
        dispatch(fetchRecipeById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setDescription(recipe.description);
            setSteps(recipe.methodOfPreparation?.split("@"));
            setProductAndQuantity(recipe.productAndQuantity?.split("@"));
            setCategory(recipe.categories?.id);
            setImageName(recipe?.imageUrl);
        }
    }, [recipe]);

    //function update
    const handleUpdate = async () => {
        const updatedRecipe = {
            id: recipe.id,
            name: name,
            description: description,
            methodOfPreparation: steps.join('@'),
            productAndQuantity: productAndQuantity.join('@'),
            recipeBook: { id: recipe.recipeBook?.id || {} },
            category: { id: recipe.category?.id || {} },
            imageUrl: recipe.imageUrl,
        };

        const response=dispatch(UpdateRecipe({ id, updatedRecipe })).unwrap();
        if ((await response).status ===201){
            setIsDialogOpen(true)
        }
        if (image) {
            dispatch(upload({ recipe: updatedRecipe, file: image }));
        }

        if ((await response).status !== 201)
        setError(true)
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const inputs = Array.from(document.querySelectorAll('input'));
            const currentIndex = inputs.findIndex((input) => input === event.currentTarget);
            if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
                (inputs[currentIndex + 1] as HTMLInputElement).focus();
            }
        }
    };

    const handleChangeStep = (index: number, value: string) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = value;
        setSteps(updatedSteps);
    };

    const handleChangeProductAndQuantity = (index: number, value: string) => {
        const updatedProducts = [...productAndQuantity];
        updatedProducts[index] = value;
        setProductAndQuantity(updatedProducts);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const open1 = () => setOpen(true);
    const close = () => setOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (slideRef.current && !slideRef.current.contains(event.target as Node)) {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectCategory = (idCategory: number) => {
        setCategory(idCategory);
        close();
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#2e2e2e' }}>Update Recipe</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter recipe name"
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                        marginBottom: '10px',
                    }}
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter recipe description"
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                    }}
                />
            </div>
            <div>
            <h3>products</h3>

                {productAndQuantity &&(
                productAndQuantity.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleChangeProductAndQuantity(index, e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Product ${index + 1}`}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
               ) ))}
            </div>
            <div>
            <h3> Method of preparation</h3>

                {steps && (
                steps.map((step, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={step}
                            onChange={(e) => handleChangeStep(index, e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Step ${index + 1}`}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
               ) ))}
            </div>

           
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={open1}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2e2e2e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                    }}
                >
                    Choose Category
                </button>

                {open && (
                    <div
                        ref={slideRef}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                padding: '20px',
                                width: '300px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h2 style={{ textAlign: 'center' }}>Select Category</h2>
                            {categories &&(
                            categories
                                .filter((c) => c.recipeBook?.id === recipe.recipeBook?.id)
                                .map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => selectCategory(c.id)}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            border: 'none',
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: '8px',
                                            marginBottom: '10px',
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {c.name}
                                    </button>
                                )))}
                        </div>
                    </div>
                )}
            </div>
            <input
                type="file"
                name="image"
                onChange={handleFileChange}
                style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    marginBottom: '20px',
                    width: '100%',
                }}
            />

            <button
                onClick={handleUpdate}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    width: '100%',
                }}
            >
                Update Recipe
            </button>
            <button
        onClick={() => navigate('/recipe')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          width: '100%',
          marginTop: '10px',
        }}
      >
        Back ⬅️
      </button>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>succeed</DialogTitle>
        <DialogContent>
          <Typography>update recipe succeed
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            close
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={error} onClose={() => setError(false)}>
        <DialogTitle>error</DialogTitle>
        <DialogContent>
          <Typography>update failed
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(false)} color="secondary">
            close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
};

export default UpdateRecipeComp;
