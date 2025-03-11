import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import Header from "./Header"
import SecondayContainer from "./SecondayContainer";
import MainBrosweContainer from "./MainBrosweContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";



const Browse = () => {

  //Calling the hooks here because then only when browse page render the hooks make the API calls
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  return (
    <>
      <Header />
      <MainBrosweContainer />
      <SecondayContainer />

    </>
  )
}

export default Browse