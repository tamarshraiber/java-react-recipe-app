// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from '../../store/api';
// import { fetchUserById } from '../user/userSlice';
// import { DeleteRecipeBook, AddRecipeBook, UpdateRecipeBook } from './recipeBookSlice';
// import { RecipeBook } from '../../models/recipeBook';
// import { useNavigate } from 'react-router-dom';
// import { setRecipeBookId } from '../recipeBook/recipeBookSlice';
// import "./recipeBookStyle.css"
// import { fetchRecipes } from '../recipe/recipeSlice';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
// import { deleteRecipeByRecipeBook } from '../recipe/recipeSlice'
// import { deleteCategoryByRecipeBook } from '../category/categorySlice';


// const RecipeBookComp = () => {

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const userId = useSelector((state: RootState) => state.user.userId.id);
//   const selectUser = useSelector((state: RootState) => state.user.selectUser);


//   const [recipebooks, setRecipebooks] = useState<RecipeBook[] | undefined>();


//   const [nameAdd, setNameAdd] = useState('');
//   const [add, setAdd] = useState(false);
//   const [nameUpdate, setNameUpdate] = useState('');
//   const [update, setUpdate] = useState(false);
//   const [bookId, setBookId] = useState<number>();
//   const [idRecipeBook, setIdRecipeBook] = useState<number>();
//   const [open, setOpen] = useState(false);//dialog


//   const refreshUserData = () => {
//     if (userId !== -1) {
//       dispatch(fetchUserById(userId));
//     }
//   };

//   useEffect(() => {
//     setRecipebooks(selectUser.recipeBooks);
//   }, [selectUser])

//   useEffect(() => {
//     refreshUserData();
//   }, [dispatch, userId]);

//   const deleteRecipeBook = (id: number) => {
//     setIdRecipeBook(id);
//     handleOpen();
//   };

//   //function add recipebook
//   const addRecipeBook = () => {
//     if (!nameAdd) return;

//     const newRecipeBook: RecipeBook = {
//       name: nameAdd,
//       user: { id: selectUser.id },
//     }

//     dispatch(AddRecipeBook(newRecipeBook)).then(() => {
//       setNameAdd('');
//       setAdd(false);
//       refreshUserData();
//     });
//   };

//   //function update recipebook
//   const updateRecipeBook = (id1: number) => {
//     if (!nameUpdate) return;

//     const updateRecipeBook: RecipeBook = {
//       name: nameUpdate,
//       user: { id: selectUser.id },
//     };

//     dispatch(UpdateRecipeBook({ id: id1, recipeBook: updateRecipeBook })).then(() => {
//       setNameUpdate('');
//       setUpdate(false);
//       refreshUserData();
//     });
//   };

//   //fetch recipes and save recipebook id in the store
//   const recipes = (idBook: number) => {
//     dispatch(setRecipeBookId(idBook));
//     dispatch(fetchRecipes());
//     navigate('/recipe');
//   };



//   //open dialog
//   const handleOpen = () => {
//     setOpen(true);
//   };

//   // delete recipebook
//   const handleClose = async (result: boolean) => {
//     if (result) {
//       if (idRecipeBook) {
//         //delete recipes from this recipebook
//         dispatch(deleteRecipeByRecipeBook(idRecipeBook));
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         //delete categories from this recipebook
//         dispatch(deleteCategoryByRecipeBook(idRecipeBook))
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         //delete recipebook
//         dispatch(DeleteRecipeBook(idRecipeBook)).then(() => {
//           refreshUserData();
//         });
//       }
//     }
//     //close dialog
//     setOpen(false);
//   };

//   return (
//     <div>
//       <h1 style={{ fontFamily: 'Pacifico' }}>my recipebooks</h1>
//       {recipebooks && recipebooks.length > 0 ? (
//         <div className="book-container">
//           {Array.isArray(recipebooks) &&
//             recipebooks
//               .map((book: any) => (
//                 <div key={book.id} className="book-card">
//                   <button onClick={() => recipes(book.id)} className="book-button">
//                     <img src={`https://via.placeholder.com/150?text=${book.name}`} alt={book.name} className="book-image" />
//                   </button>
//                   <div className="book-title">{book.name}</div>
//                   <button onClick={() => { setUpdate(true); setBookId(book.id); }} className="edit-button">✏️</button>
//                   <button onClick={() => deleteRecipeBook(book.id)} className="delete-button">❌</button>
//                   {update && bookId === book.id && (
//                     <div className="update-input">
//                       <input
//                         type="text"
//                         value={nameUpdate}
//                         onChange={(e) => setNameUpdate(e.target.value)}
//                         placeholder={book.name}
//                       />
//                       <button onClick={() => updateRecipeBook(book?.id)}>✅</button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//         </div>
//       ) : (
//         <p>No Recipe Books Found</p>
//       )}

//       {add ? (
//         <div className="add-book">
//           <input
//             type="text"
//             value={nameAdd}
//             onChange={(e) => setNameAdd(e.target.value)}
//             placeholder="Name of book"
//           />
//           <button onClick={addRecipeBook}>✅ addition</button>
//         </div>
//       ) : (
//         <button onClick={() => setAdd(true)} className="add-button">added a new book</button>
//       )}
//       <div>
//         <Dialog open={open} onClose={() => handleClose(false)}>
//           <DialogTitle>Deleting a recipe book</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               When the book is deleted, all the recipes and categories in it will also be deleted, still interested?
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => handleClose(false)} color="secondary">
//               no
//             </Button>
//             <Button onClick={() => handleClose(true)} color="primary" autoFocus>
//               yes
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default RecipeBookComp;

















import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/api';
import { fetchUserById } from '../user/userSlice';
import { DeleteRecipeBook, AddRecipeBook, UpdateRecipeBook } from './recipeBookSlice';
import { RecipeBook } from '../../models/recipeBook';
import { useNavigate } from 'react-router-dom';
import { setRecipeBookId } from '../recipeBook/recipeBookSlice';
import "./recipeBookStyle.css"
import { fetchRecipes } from '../recipe/recipeSlice';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { deleteRecipeByRecipeBook } from '../recipe/recipeSlice'
import { deleteCategoryByRecipeBook } from '../category/categorySlice';
import {fetchRecipeBookByUserId} from './recipeBookSlice'

const RecipeBookComp = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.user.userId.id);
  const selectUser = useSelector((state: RootState) => state.user.selectUser);


  // const [recipebooks, setRecipebooks] = useState<RecipeBook[] | undefined>();


  const [nameAdd, setNameAdd] = useState('');
  const [add, setAdd] = useState(false);
  const [nameUpdate, setNameUpdate] = useState('');
  const [update, setUpdate] = useState(false);
  const [bookId, setBookId] = useState<number>();
  const [idRecipeBook, setIdRecipeBook] = useState<number>();
  const [open, setOpen] = useState(false);//dialog


  const refreshUserData = () => {
    if (userId !== -1) {
      // dispatch(fetchUserById(userId));
      dispatch(fetchRecipeBookByUserId(userId));
    }
  };

  // useEffect(()=>{
  //   dispatch(fetchRecipeBookByUserId(userId))
  // },[userId])

const recipebooks=useSelector((state:RootState)=>state.recipeBook.recipeBookByUserId)

  // useEffect(() => {
  //   setRecipebooks(selectUser.recipeBooks);
  // }, [selectUser])

  useEffect(() => {
    refreshUserData();
  }, [dispatch, userId]);

  const deleteRecipeBook = (id: number) => {
    setIdRecipeBook(id);
    handleOpen();
  };

  //function add recipebook
  const addRecipeBook = () => {
    if (!nameAdd) return;

    const newRecipeBook: RecipeBook = {
      name: nameAdd,
      user: { id: selectUser.id },
    }

    dispatch(AddRecipeBook(newRecipeBook)).then(() => {
      setNameAdd('');
      setAdd(false);
      refreshUserData();
    });
  };

  //function update recipebook
  const updateRecipeBook = (id1: number) => {
    if (!nameUpdate) return;

    const updateRecipeBook: RecipeBook = {
      name: nameUpdate,
      user: { id: selectUser.id },
    };

    dispatch(UpdateRecipeBook({ id: id1, recipeBook: updateRecipeBook })).then(() => {
      setNameUpdate('');
      setUpdate(false);
      refreshUserData();
    });
  };

  //fetch recipes and save recipebook id in the store
  const recipes = (idBook: number) => {
    dispatch(setRecipeBookId(idBook));
    dispatch(fetchRecipes());
    navigate('/recipe');
  };



  //open dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // delete recipebook
  const handleClose = async (result: boolean) => {
    if (result) {
      if (idRecipeBook) {
        //delete recipes from this recipebook
        dispatch(deleteRecipeByRecipeBook(idRecipeBook));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        //delete categories from this recipebook
        dispatch(deleteCategoryByRecipeBook(idRecipeBook))
        await new Promise((resolve) => setTimeout(resolve, 1000));
        //delete recipebook
        dispatch(DeleteRecipeBook(idRecipeBook)).then(() => {
          refreshUserData();
        });
      }
    }
    //close dialog
    setOpen(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'Pacifico' }}>my recipebooks</h1>
      {recipebooks && recipebooks.length > 0 ? (
        <div className="book-container">
          {/* {Array.isArray(recipebooks) &&
            recipebooks
              .map((book: any) => (
                <div key={book.id} className="book-card"> */}
       {recipebooks.map((book: any, index: number) => (
               <div key={book.id || index} className="book-card">
                  <button onClick={() => recipes(book.id)} className="book-button">
                    <img src={`https://via.placeholder.com/150?text=${book.name}`} alt={book.name} className="book-image" />
                  </button>
                  <div className="book-title">{book.name}</div>
                  <button onClick={() => { setUpdate(true); setBookId(book.id); }} className="edit-button">✏️</button>
                  <button onClick={() => deleteRecipeBook(book.id)} className="delete-button">❌</button>
                  {update && bookId === book.id && (
                    <div className="update-input">
                      <input
                        type="text"
                        value={nameUpdate}
                        onChange={(e) => setNameUpdate(e.target.value)}
                        placeholder={book.name}
                      />
                      <button onClick={() => updateRecipeBook(book?.id)}>✅</button>
                    </div>
                  )}
                </div>
              ))}
        </div>
      ) : (
        <p>No Recipe Books Found</p>
      )}

      {add ? (
        <div className="add-book">
          <input
            type="text"
            value={nameAdd}
            onChange={(e) => setNameAdd(e.target.value)}
            placeholder="Name of book"
          />
          <button onClick={addRecipeBook}>✅ addition</button>
        </div>
      ) : (
        <button onClick={() => setAdd(true)} className="add-button">added a new book</button>
      )}
      <div>
        <Dialog open={open} onClose={() => handleClose(false)}>
          <DialogTitle>Deleting a recipe book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              When the book is deleted, all the recipes and categories in it will also be deleted, still interested?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)} color="secondary">
              no
            </Button>
            <Button onClick={() => handleClose(true)} color="primary" autoFocus>
              yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default RecipeBookComp;






