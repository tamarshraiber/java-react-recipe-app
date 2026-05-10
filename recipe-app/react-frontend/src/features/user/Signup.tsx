// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { SignUp } from './userSlice';
// import {Signup_User} from '../../models/signup_user';
// import { AppDispatch } from '../../store/api';
// import './style.css';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
// } from "@mui/material";


// const Signup = () => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();

//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: ""
//   })


//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
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

//     //contain letters' numbers and @
//     if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email address'
//     }
//     //contain at least 6 chars and include leters,char,numbers
//     if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password) && formData.email.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters, include uppercase,lowercase,number and special character.';
//     }
//     setErrors(newErrors);

//     //return if the inputs valid
//     const isValid = (Object.keys(newErrors) as (keyof typeof newErrors)[])
//       .every((key) => !newErrors[key]);
//     return isValid;
//   }

//   //try to signuo user
//   const handleSignup = async (e: React.FormEvent) => {
//     //delete the default and prevents refresh
//     e.preventDefault();
//     if (validateFields()) {
//       try {
//         const ans = await dispatch(SignUp(formData)).unwrap();
//         const status = ans.status;
//         switch (status) {
//           //succeed
//           case 201:
//             navigate("/home");
//             break;
//           //existing user
//           case 409:
//             {

//               setErrors((prevError) => ({
//                 ...prevError,
//                 email: "User with this email is already exists.please use a different email",
//               }));
//             }
//             setIsDialogOpen(true);
//             break;
//         }
//       } catch (err: any) {

//       }
//     }
//   }

//   //update from data and inital form data
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
//             <h1>Sign Up</h1>
//             <form onSubmit={handleSignup}>
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
//                 type="email"
//                 name='email'
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//               />
//               <input
//                 type="password"
//                 name='password'
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//               />
//               {errors.password && <div className="error">{errors.password}</div>}
//               <button type="submit">Sign Up</button>
//             </form>
//             <div className="switch-link">
//               Already have an account? <a href="/login">Login</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
//         <DialogTitle>error</DialogTitle>
//         <DialogContent>
//           <Typography>registered user in the system
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDialogOpen(false)} color="secondary">
//             close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>

//   )
// }
// export default Signup;












import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignUp } from './userSlice';
import {Signup_User} from '../../models/signup_user';
import { AppDispatch } from '../../store/api';
import './style.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";


const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  })


  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: ""
  });


  //input valid check
  const validateFields = () => {
    const newErrors = { ...errors };

    //contains at keast 2 letters
    if (!formData.userName || !/^[a-zA-Z\s]{2,}$/.test(formData.userName)) {
      newErrors.userName = ''
    }

    //contain letters' numbers and @
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    //contain at least 6 chars and include leters,char,numbers
    if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password) && formData.email.length < 6) {
      newErrors.password = 'Password must be at least 6 characters, include uppercase,lowercase,number and special character.';
    }
    setErrors(newErrors);

    //return if the inputs valid
    const isValid = (Object.keys(newErrors) as (keyof typeof newErrors)[])
      .every((key) => !newErrors[key]);
    return isValid;
  }

  //try to signuo user
  const handleSignup = async (e: React.FormEvent) => {
    //delete the default and prevents refresh
    e.preventDefault();
    if (validateFields()) {
      try {
        const ans = await dispatch(SignUp(formData)).unwrap();
        const status = ans.status;
        switch (status) {
          case 200:
             navigate("/home");
             break;
          //succeed
          case 201:
            navigate("/home");
            break;
          //existing user
          case 409:
            {

              setErrors((prevError) => ({
                ...prevError,
                email: "User with this email is already exists.please use a different email",
              }));
            }
            setIsDialogOpen(true);
            break;
        }
      } catch (err: any) {

      }
    }
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                name='userName'
                value={formData.userName}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && <div className="error">{errors.password}</div>}
              <button type="submit">Sign Up</button>
            </form>
            <div className="switch-link">
              Already have an account? <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>error</DialogTitle>
        <DialogContent>
          <Typography>registered user in the system
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
export default Signup;
















