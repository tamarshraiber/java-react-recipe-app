import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { RootState } from '../store/api'

// interface ProtectedRouteProps {
//     children: JSX.Element;
// }

// const ProtectedRouting: React.FS<ProtectedRouteProps> = ({children}) => {
//     const navigate=useNavigate();
//     const {isConect}=useSelector((state:RootState)=>state.user)
//     return isConect? children :navigate('/');
// }


// export default ProtectedRouting;

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate=useNavigate();
    const {isConect}=useSelector((state:RootState)=>state.user)  
  if (!isConect) {
    navigate('/');
  }

  return children;
};
export default ProtectedRoute;
