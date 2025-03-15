import React from 'react';
import {useSelector} from "react-redux"
import lang from "../utils/languageConstants"

const GptSearchBar = () => {

    // get the config lang from store
    const langkey = useSelector((store)=> store.config.lang)
    

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-4 flex">
        <input
          type="text"
          placeholder={lang[langkey]?.gptSearchPlaceholder}
          className="flex-grow p-3 rounded-l-lg text-gray-900 outline-none bg-gray-100 placeholder-gray-500"
        />
        <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-r-lg hover:bg-red-700 transition-all">
        {lang[langkey]?.search }
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
