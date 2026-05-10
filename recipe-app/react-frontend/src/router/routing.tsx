
import React from 'react'
import LoginComp from '../features/user/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ודא שאת מייבאת את כל הרכיבים הנכונים
import HomeComp from '../components/HomeComp'
import WelcomeComp from '../components/WelcomeComp';
import RecipeBookComp from '../features/recipeBook/recipeBookComp';
import AddRecipeComp from '../features/recipe/AddRecipeComp';
import UpdateRecipeComp  from '../features/recipe/UpdateRecipeComp';
import ShowRecipeComp from '../features/recipe/ShowRecipeComp'
import ProtectedRouting from './ProtectedRouting';
import CategoryComp from '../features/category/CategoryComp';
import ShowRecipeByImage from '../features/recipe/ShowRecipeByImage';
import ShowRecipeByName from '../features/recipe/ShowRecipeByName';
import Signup from '../features/user/Signup';

export const Routing = () => {
  return (
    // <Router>
      <Routes>
        {/* <Route path='/home' element={<ProtectedRouting><HomeComp/></ProtectedRouting>}></Route> */}
        <Route path='/' element={<WelcomeComp/>}></Route>
        {/* <Route path='/' element={<LoginComp/>}></Route> */}
        <Route path='/home' element={<HomeComp/>}></Route>
        <Route path='/login' element={<LoginComp/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/recipeBook' element={<RecipeBookComp/>}></Route>
        <Route path='/recipe' element={<ShowRecipeByName/>}></Route>
        <Route path='/category' element={<CategoryComp/>}></Route>
        <Route path='/addRecipe' element={<AddRecipeComp/>}></Route>
        <Route path='/updateRecipe' element={<UpdateRecipeComp/>}></Route>
        <Route path='/showRecipe' element={<ShowRecipeComp/>}></Route>
        <Route path='/showByImage' element={<ShowRecipeByImage/>}></Route>
        
      </Routes>
    // </Router> */}
  )
}











// import React from 'react'
// import LoginComp from '../features/user/Login'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ודא שאת מייבאת את כל הרכיבים הנכונים
// import HomeComp from '../components/HomeComp'
// import SignUpComp from '../features/user/SignUpComp'
// import WelcomeComp from '../components/WelcomeComp';
// import RecipeBookComp from '../features/recipeBook/recipeBookComp';
// import AddRecipeComp from '../features/recipe/AddRecipeComp';
// import UpdateRecipeComp  from '../features/recipe/UpdateRecipeComp';
// import ShowRecipeComp from '../features/recipe/ShowRecipeComp'
// import ProtectedRouting from './ProtectedRouting';
// import CategoryComp from '../features/category/CategoryComp';
// import ShowRecipeByImage from '../features/recipe/ShowRecipeByImage';
// import RecipeComp from '../features/recipe/RecipeComp';

// export const Routing = () => {
//   return (
//       <Routes>
//         <Route path='/' element={<WelcomeComp/>}></Route>
//         <Route path='/home' element={<ProtectedRouting><HomeComp/></ProtectedRouting>}></Route>
//         <Route path='/login' element={<ProtectedRouting><LoginComp/></ProtectedRouting>}></Route>
//         <Route path='/signup' element={<ProtectedRouting><SignUpComp/></ProtectedRouting>}></Route>
//         <Route path='/recipeBook' element={<ProtectedRouting><RecipeBookComp/></ProtectedRouting>}></Route>
//         <Route path='/recipe' element={<ProtectedRouting><RecipeComp/></ProtectedRouting>}></Route>
//         <Route path='/category' element={<ProtectedRouting><CategoryComp/></ProtectedRouting>}></Route>
//         <Route path='/addRecipe' element={<ProtectedRouting><AddRecipeComp/></ProtectedRouting>}></Route>
//         <Route path='/updateRecipe' element={<ProtectedRouting><UpdateRecipeComp/></ProtectedRouting>}></Route>
//         <Route path='/showRecipe' element={<ProtectedRouting><ShowRecipeComp/></ProtectedRouting>}></Route>
//         <Route path='/showByImage' element={<ProtectedRouting><ShowRecipeByImage/></ProtectedRouting>}></Route>
//       </Routes>
//   )
// }