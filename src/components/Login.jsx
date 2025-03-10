import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
import { Login_BG } from "../utils/constants";


const Login = () => {

  const [isSignInForm,setIsSignInForm] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

  // useRef used to refer the value of the input field
  const email = useRef(null);
  const password = useRef(null);
  const name     = useRef(null);
  const dispatch = useDispatch();


  const handleButtonClick = () =>{
    // Validata the form data

    // calling validation function from the utils/validate.js  
    const message =  checkValidateData(email.current.value,password.current.value)
    setErrorMessage(message);
    if(message) return;

    //Sign In Sign Up Logic
    if(!isSignInForm)
    {
      //Sign Up logic
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        //Update the display name 
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {

           
            const {uid,email,displayName} = auth.currentUser
    
            //inserting the user object into our slice using dispatch function
          dispatch(addUser({uid:uid,email:email,displayName:displayName}))

          

        }).catch((error) => {
          setErrorMessage(error.message)
        });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "," +errorMessage)
      });
    
    }
    else{
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message; 
        setErrorMessage(errorCode + "," +errorMessage)
      });
    }

  }

  const toggleSignUp= () =>
  {
      setIsSignInForm(!isSignInForm)
  } 
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={Login_BG}
          alt="logo"
        />
      </div>
      <div className="bg-black w-3/12 absolute p-12  my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-85">
        <form className="" onSubmit={(e)=>e.preventDefault()}>
          <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"} </h1>
          {!isSignInForm && 
          <input
          ref={name}
            type="text"
            placeholder="Full name"
            className="p-2 my-2 bg-gray-600 w-full rounded-sm"
          />
        }
          <input  
            ref={email} // give ref if using useRef state
            type="text"
            placeholder="Email Address"
            className="p-2 my-2 bg-gray-600 w-full rounded-sm"
          />
          <input
            ref={(password)}
            type="password"
            placeholder="password"
            className="p-2 my-2 bg-gray-600 w-full rounded-sm"
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button className="p-2 my-4 rounded-sm bg-red-500 font-bold w-full cursor-pointer" onClick={handleButtonClick}>
             {isSignInForm?"Sign In" : "Sign up"} 
          </button>
          <div className="flex items-center justify-center">
            <h2>OR</h2>
          </div>
          <button className="p-2 my-4 bg-gray-500 rounded-sm w-full font-bold cursor-pointer">
            Use a sign-in code
          </button>
          <div className="flex items-center justify-center">
            <a>Forgot password?</a>
          </div>
          <div className="my-4">
            <span>Remember me</span>
          </div>

          <div className="my-4">
            <span>
              {isSignInForm?" New to Netflix? ":"Already an user "}
             <a className="font-bold cursor-pointer" onClick={toggleSignUp}>{isSignInForm?"Sign up now.":"Sign In"}</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
