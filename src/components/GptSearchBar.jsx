import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
// import client from "../utils/openai";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// console.log(GEMINI_API_KEY)

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const GptSearchBar = () => {

  const dispatch = useDispatch();

  // get the config lang from store
  const langkey = useSelector((store) => store.config.lang);

  //get the input value from the search box
  const SearchInputText = useRef(null);

  // const handleGPTSearchClick = async () => {
  //   const searchText = SearchInputText.current.value;

  //   // Make an API call to GPT API and get Movie Results

  //   const gptQuery =
  //     "Act as a movie Recommendation system and suggest some movies for the query :" +
  //     searchText +
  //     ". only give me names of 5 movies, comma seperated like the example like the example result given ahead.Example Result: Gadar, Sholay, Don etc,";

  //   const response = await client.responses.create({
  //     model: "gpt-3.5-turbo",
  //     instructions: "You are a coding assistant that talks like a pirate",
  //     input: gptQuery,
  //   });

  //   console.log(response.output_text);
  // };

  const handleGPTSearchClick = async () => {
    const searchText = SearchInputText.current.value;

    const gptQuery = `Act as a movie recommendation system and suggest some movies for the query: "${searchText}". Only return the names of 5 movies, comma-separated (Example: Gadar, Sholay, Don, etc.).`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      const movies = response.text().split(",");

      //call the function for each movies
      const promiseArray = movies.map((movie) => SearchMovieTMDB(movie));

      //google it for promise.all function
      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);

      //Passing an multiple object in the same action
      dispatch(addGptMoviesResult({movieNames:movies, movieResults:tmdbResults}))

      console.log("Recommended Movies:", movies);
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
    }
  };

  //This function is used to search the movie in TMDB
  const SearchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  return (
    <div className="flex justify-center items-center  ">
      <form
        className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-4 flex"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={SearchInputText}
          placeholder={lang[langkey]?.gptSearchPlaceholder}
          className="flex-grow p-3 rounded-l-lg text-gray-900 outline-none bg-gray-100 placeholder-gray-500"
        />
        <button
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-r-lg hover:bg-red-700 transition-all"
          onClick={handleGPTSearchClick}
        >
          {lang[langkey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
