import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, FacebookAuthProvider, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

firebase.initializeApp(firebaseConfig)


export const initializeLoginFramework = () => {
    if(!firebase.app.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}

const auth = getAuth();

// Sign In with Google
export const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();

    // signInWithPopup(auth, googleProvider)
    return signInWithPopup(auth, googleProvider)
    .then((result) => {
      const {displayName, photoURL, email} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
    //   setUser(signedInUser);
    return signedInUser;

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage, email, credential);
    });
}

// Sign In with Facebook
export const handleFbSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();
    
    return signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      return user;
      user.success = true;
    })
    .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(errorCode)
      console.log(errorMessage)
      console.log(email)
      console.log(credential)
    });
}

// Sign Out with Google
export const handleSignOut = () => {
    // signOut(auth).then((res) => {
      return signOut(auth).then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
    //   setUser(signedOutUser);
    return signedOutUser;
    }).catch((error) => {
      
    });
  }

  // Sign Up with Email & Password
  export const createUserWithEmailPassword = (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        verifyEmail();
        return newUserInfo;
      })
      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }

  // Sign In with Email & Password
  export const signInWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Signed in 
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })


      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }


// Update a user's profile with Email & Password
const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('user name updated successfully')
    }).catch((error) => {
      console.log(error)
    });
}


// Send a user a verification email for new User
const verifyEmail = () => {

  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
}

// Send a password reset email
export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}


