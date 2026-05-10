import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCategories } from '../category/categorySlice';
import { Recipe } from '../../models/recipe';
import { AddRecipe, upload } from './recipeSlice';
import { AppDispatch, RootState } from '../../store/api';
import { Category } from '../../models/category';
import { fetchRecipes } from './recipeSlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";


const AddRecipeComp = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const recipeBookId = useSelector((state: RootState) => state.recipeBook.recipeBookId);
  const categories = useSelector((state: RootState) => state.category.categories)
  const isCategory = useSelector((state: RootState) => state.category.isCategory)

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(-1);
  const [name, setName] = useState('');
  const [descriptionAdd, setDescriptionAdd] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null); //
  const [steps, setSteps] = useState([""]);
  const [productAndQuantity, setProductAndQuantity] = useState(["", ""]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false)

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});


  useEffect(() => {
    if (!isCategory) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  //Changing the place of the cursor and increasing the array
  const handleKeyDown = (event: any, index: number, type: any) => {
    if (event.key === 'Enter') {
      if (type === 'step') {
        const newSteps = [...steps];
        newSteps.splice(index + 1, 0, '');
        setSteps(newSteps);
        setTimeout(() => {
          inputRefs.current[`step-${index + 1}`]?.focus();
        }, 0);
      } else if (type === 'product') {
        if (index % 2 === 0) {
          setTimeout(() => {
            inputRefs.current[`product-${index + 1}`]?.focus();
          }, 0);
        } else {
          const newProducts = [...productAndQuantity, '', ''];
          setProductAndQuantity(newProducts);
          setTimeout(() => {
            inputRefs.current[`product-${index + 1}`]?.focus();
          }, 0);
        }
      }
    }
  };

  //change value
  const handleChange = (event: any, index: number, type: any) => {
    if (type === 'step') {
      const newSteps = [...steps];
      newSteps[index] = event.target.value;
      setSteps(newSteps);
    } else if (type === 'product') {
      const updatedArray = [...productAndQuantity];
      updatedArray[index] = event.target.value;
      setProductAndQuantity(updatedArray);
    }
  };

  //update file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  //function add
  const addRecipe = async () => {
    const productString = productAndQuantity.join('@');
    const stepsString = steps.join('@');

    const newRecipe: Recipe = {
      name: name,
      description: descriptionAdd,
      methodOfPreparation: stepsString,
      productAndQuantity: productString,
      recipeBook: { id: recipeBookId },
      category: { id: category },
    };
    const response = await dispatch(AddRecipe(newRecipe)).unwrap();
    if (response.status === 201) {
      setIsDialogOpen(true)
      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      const file = fileInput?.files?.[0];
      if (file) {
        dispatch(upload({ recipe: response.data, file: file }))
      }
    }
    if (response.status !== 201)
      setError(true)
  };

  //open slide
  const open1 = () => {
    setOpen(true);
  };

  //close slide
  const close = () => {
    setOpen(false);
  };

  //close slide with a click
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

  //selected category id 
  const select = (idCategory: number) => {
    setCategory(idCategory);
    close();
  };



  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#2e2e2e' }}>add recipe </h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, 0, [name])}
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
          value={descriptionAdd}
          onChange={(e) => setDescriptionAdd(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, 1, [descriptionAdd])}
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
        {productAndQuantity.map((value, index) => (
          <div key={`product-div-${index}`} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              ref={(el) => (inputRefs.current[`product-${index}`] = el)}
              value={value}
              onChange={(e) => handleChange(e, index, 'product')}
              onKeyDown={(e) => handleKeyDown(e, index, 'product')}
              placeholder={index % 2 === 0 ? 'product' : 'quantity'}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <h3> Method of preparation</h3>
        {steps.map((value, index) => (

          <div key={`step-div-${index}`} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              key={`step-${index}`}
              ref={(el) => (inputRefs.current[`step-${index}`] = el)}
              value={value}
              onChange={(e) => handleChange(e, index, 'step')}
              onKeyDown={(e) => handleKeyDown(e, index, 'step')}
              placeholder={`step ${index + 1}`}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        ))}
      </div>
      <ul>
        {products.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {category && (
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
            Choose Category *
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
                <ul style={{ listStyleType: 'none', padding: 0 }}>

                  {categories
                    .filter((category) => category.recipeBook?.id === recipeBookId)
                    .map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => select(category.id)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            margin: '5px 0',
                            cursor: 'pointer',
                          }}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                </ul>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    marginTop: '10px',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
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
      <button onClick={addRecipe}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          width: '100%',
        }}>✔️  save recipe</button>
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
          <Typography>add recipe succeed
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
          <Typography>Add failed
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

export default AddRecipeComp;