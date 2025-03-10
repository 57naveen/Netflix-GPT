import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import Header from "./Header"
import SecondayContainer from "./SecondayContainer";
import MainBrosweContainer from "./MainBrosweContainer";



const Browse = () => {

  useNowPlayingMovies();

  return (
    <>
      <Header />
      <MainBrosweContainer />
      <SecondayContainer />

    </>
  )
}

export default Browse