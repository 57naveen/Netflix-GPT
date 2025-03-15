import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { logo, SUPPORTED_LANGUAGES, User_Avatar } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // here we are subscribe to store and get the user data
  const user = useSelector((Store) => Store.user);
  
  const showGptSearch =  useSelector((store) => store.gpt.showGptSearch)

  const handelSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  // Using the useEffect to call this APi at initial render
  useEffect(() => {
    //This function  return the user object
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //sign In

        // getting this object from firebase
        const { uid, email, displayName } = user;

        //inserting the user object into our slice using dispatch function
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        //sign out

        // when user signed out remove the user data from the slice
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const toggleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handelLanguageChange = (e) =>
  {
    
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={logo} alt="logo" />

      { showGptSearch &&
       <select className="text-white ml-180 outline-none" onChange={handelLanguageChange}>
       {SUPPORTED_LANGUAGES.map((lang) => (
         <option className="text-black" key={lang.identfier}>
           {lang.name}
         </option>
       ))}
     </select> }
     

      {user && (
        <div className="flex p-2">
          <button
            onClick={toggleGptSearch}
            className="text-white border border-black rounded-xl px-6 h-11 cursor-pointer  bg-red-500 hover:bg-red-400"
          >
           {showGptSearch? "Home" : "GPT Search"} 
          </button>
          <img
            className="w-12 h-12 mx-5 rounded-3xl"
            alt="usericon"
            src={User_Avatar}
          />
          <button
            onClick={handelSignOut}
            className="font-bold  text-white cursor-pointer border border-black bg-amber-600 hover:bg-amber-500 px-4 h-11 rounded-lg "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
