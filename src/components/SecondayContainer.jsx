import React from 'react'
import MovieList from './MovieList'
import {useSelector} from "react-redux"

const SecondayContainer = () => {


  const movies = useSelector((store)=>store.movies);

  return  (
    movies.nowPlayingMovies &&(
    <div className='bg-black'>
      <div className='-mt-72 pl-12 relative z-20'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Top Rated"} movies={movies.TopRatedMovies} /> 
      <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies} />
      </div>
      
    </div>
     )
  )
}

export default SecondayContainer