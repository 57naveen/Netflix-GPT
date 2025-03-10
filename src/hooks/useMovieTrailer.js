import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  // fetch trailer video and updating the store with trailer video data
  const fetchMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);

    //There are many array of object so filter only trailer in that.
    const filteredData = json.results.filter(
      (video) => video.type === "Trailer"
    );

    //this is line used to filter one  trailer if the movie have more then one trailer and if trailer is not found take any clip
    const trailer = filteredData.length ? filteredData[0] : json.result[0];
    // console.log(trailer);

    //Insert the trailer object into the store
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    fetchMovie();
  }, []);
};

export default useMovieTrailer;
