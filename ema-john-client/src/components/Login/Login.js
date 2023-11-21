import React, { useContext, useState } from 'react';

import { UserContext } from '../UserContext/UserContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, resetPassword, signInWithEmailPassword } from './loginManager';


function Login() {

  const [loading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLoginFramework();

  // Use context Api for data passing anywhere
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // When logged-in the redirect the wanted page.
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'


  // Sign In with Google
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true)
    });
  }

  // Sign Out with Google
  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }

  // Save email & password in state
  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  // Submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Sign Up with Email & Password
    if(newUser && user.email && user.password) {
      createUserWithEmailPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
        setIsLoading(false)
      })
    }


    // Sign In with Email & Password
    if(!newUser && user.email && user.password) {
      signInWithEmailPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true)
        setIsLoading(false)
      })
    }

  }


  // Sign In with Facebook
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }
  
  // same code optimized.
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res)
    if(redirect) {
      navigate(from, {replace: true});
    }
  }

  loading && <p>Loading......</p>

  return (
    <div style={{textAlign: 'center', padding: '30px 10px'}}>

      { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In With Google</button> }
      <br />
      <button onClick={fbSignIn}>Sign In With Facebook</button>

      {
        user.isSignedIn && <div>
          <img src={user.photo} alt={user.name} />
          <p>Welcome, <b>{user.name}</b></p>
          <p>Email: {user.email}</p>
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser" />
      <label htmlFor="newUser">New User Sign Up</label>

      <form action="" onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} name='name' placeholder='Enter Your Name' />}
        <br />
        <input type="type" onBlur={handleBlur} name='email' placeholder='Your Email Address' required />
        <br/>
        <input type="password" onBlur={handleBlur} name="password" placeholder='Your Password' required />
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      {!newUser && <button onClick={() => resetPassword(user.email)}>Forget or Reset Password</button>}

      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged In'} Successfully.</p>}
       
    </div>
  );
}

export default Login;