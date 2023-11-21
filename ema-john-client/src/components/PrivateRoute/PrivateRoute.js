import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

// const PrivateRoute = ({ children, redirectTo }) => {
const PrivateRoute = ({ children }) => {
    const location = useLocation();
    console.log(location)
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // return loggedInUser.email ? <Navigate to="/login" state ={{from: location}} replace></Navigate> : children;
    return loggedInUser.email ? children : <Navigate to='/login' state={{from: location}} replace />;
    // return loggedInUser.email ? children : <Navigate to={redirectTo} replace state={{ from: location }} />;
    // return loggedInUser.email ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default PrivateRoute;