import React, { use, useEffect } from "react";
import Browse from "./Browse";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from "../utils/userSlice"


const Body = () => {

  
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  // Using the useEffect to call this APi at initial render
  useEffect(()=>{

    //This function  retuen the uer object
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //sign In

        // getting this object from firebase
        const {uid,email,displayName} = user 

        //inserting the user object into our slice using dispatch function
       dispatch(addUser({uid:uid,email:email,displayName:displayName}))
      
      } else {

        //sign out 

        // when user signed out remove the user data from the slice
        dispatch(removeUser());
        navigate("/")
       
      }
    });
  
  },[])


  


  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
