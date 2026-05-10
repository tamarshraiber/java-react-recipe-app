// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Login } from './userSlice';
// import { useNavigate } from 'react-router-dom';
// import { AppDispatch } from '../../store/api';
// import {Login_User} from '../../models/login_user'
// import './style.css';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
// } from "@mui/material";


// const LoginComp = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
  
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     password: ""
//   })


//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     password: ""
//   });



//   //input valid check
//   const validateFields = () => {
//     const newErrors = { ...errors };

//     //contains at keast 2 letters
//     if (!formData.firstName || !/^[a-zA-Z\s]{2,}$/.test(formData.firstName)) {
//       newErrors.firstName = ''
//     }
//     //contains at keast 2 letters
//     if (!formData.lastName || !/^[a-zA-Z\s]{2,}$/.test(formData.lastName)) {
//       newErrors.lastName = ''
//     }
//     //contain at least 6 chars and include leters,char,numbers
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password) && formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters, include uppercase,lowercase,number and special character.';
//     }
//     setErrors(newErrors);

//     //return if the inputs valid
//     const isValid = (Object.keys(newErrors) as (keyof typeof newErrors)[])
//       .every((key) => !newErrors[key]);
//     return isValid;
//   }

//   //try to login user
//   const handleLogin = async (e: React.FormEvent) => {
//     //delete the default and prevents refresh
//     e.preventDefault();
//     if (validateFields()) {
//       try {
//         const response = await dispatch(Login(formData)).unwrap();
//         switch (response.status) {
//           //succeed
//           case 200:
//             navigate("/home");
//             break;
//           case 401:{
//             //error password
//             console.log('401 - error password');
//             setIsDialogOpen(true)
//           }
//             break;
//           //not found
//           case 404:
//             console.error("not found")
//             navigate("/signup")
//             break;
//         }

//       } catch (error) {
//         console.error("Error during login:", error);
//         navigate("/Signup")
//       }
//     };
//   }

// //update from data and inital form data
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   }



//   return (
//     <div className="login-signup-page">
//       <div className="form-box">
//         <div>
//           <div className="form-container">
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
//               <input
//                 type="text"
//                 name='firstName'
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="First Name"
//               />
//               <input
//                 type="text"
//                 name='lastName'
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//               />
//               <input
//                 type="password"
//                 name='password'
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//               />
//               {/* print the error message */}
//               {errors.password && <div className="error">{errors.password}</div>}
//               <button type="submit">Login</button>
//             </form>
//             <div className="switch-link">
//               Don't have an account? <a href="/signup">Sign up</a>
//             </div>
//           </div>
//         </div>
//         <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//         <DialogTitle>error</DialogTitle>
//         <DialogContent>
//           <Typography>error password
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDialogOpen(false)} color="secondary">
//             close
//           </Button>
//         </DialogActions>
//       </Dialog>
//       </div>
//     </div>

//   );
// };


// export default LoginComp;













import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from './userSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/api';
import {Login_User} from '../../models/login_user'
import './style.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";


const LoginComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  })


  const [errors, setErrors] = useState({
    userName: "",
    password: ""
  });



  //input valid check
  const validateFields = () => {
    const newErrors = { ...errors };

    //contains at keast 2 letters
    if (!formData.userName || !/^[a-zA-Z\s]{2,}$/.test(formData.userName)) {
      newErrors.userName = ''
    }
    //contain at least 6 chars and include leters,char,numbers
    if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password) && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters, include uppercase,lowercase,number and special character.';
    }
    setErrors(newErrors);

    //return if the inputs valid
    const isValid = (Object.keys(newErrors) as (keyof typeof newErrors)[])
      .every((key) => !newErrors[key]);
    return isValid;
  }

  //try to login user
  const handleLogin = async (e: React.FormEvent) => {
    //delete the default and prevents refresh
    e.preventDefault();
    if (validateFields()) {
      try {
        const response = await dispatch(Login(formData)).unwrap();
        switch (response.status) {
          //succeed
          case 200:
            navigate("/home");
            break;
          case 401:{
            //error password
            console.log('401 - error password');
            setIsDialogOpen(true)
          }
            break;
          //not found
          case 404:
            console.error("not found")
            navigate("/signup")
            break;
        }

      } catch (error) {
        console.error("Error during login:", error);
        navigate("/Signup")
      }
    };
  }

//update from data and inital form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }



  return (
    <div className="login-signup-page">
      <div className="form-box">
        <div>
          <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name='userName'
                value={formData.userName}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {/* print the error message */}
              {errors.password && <div className="error">{errors.password}</div>}
              <button type="submit">Login</button>
            </form>
            <div className="switch-link">
              Don't have an account? <a href="/signup">Sign up</a>
            </div>
          </div>
        </div>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>error</DialogTitle>
        <DialogContent>
          <Typography>error password
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>

  );
};


export default LoginComp;
