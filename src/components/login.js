import React from "react"
import { navigate } from '@reach/router';
import { useState} from "react"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { setUser, isLoggedIn } from "../utils/auth"
// import useFirebase  from "gatsby-plugin-firebase";
import firebase from "../helper/firebase"

const Login = () => {
//   const [firebase, setFirebase] = useState();

//   useFirebase(firebase => {
//     setFirebase(firebase);
//   }, [])

  if (isLoggedIn()) {
    navigate(`/admin/admin-form`)
  }

  function getUiConfig(auth) {
    return {
      signInFlow: 'popup',
      signInOptions: [
        auth.GoogleAuthProvider.PROVIDER_ID,
        auth.EmailAuthProvider.PROVIDER_ID
      ],
      // signInSuccessUrl: '/app/profile',
      callbacks: {
        signInSuccessWithAuthResult: (result) => {
          setUser(result.user);
          navigate('/admin/admin-form');
        }
      }
    };
  }

  return (
      <div>
        <p>Please sign-in to access to the private route:</p>
        {firebase && <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()}/>}
      </div>
      
  );

}

export default Login