import React from 'react'
import VideoBackground from './VideoBackground'
import TopVideoTitle from './TopVideoTitle'
import { useSelector } from 'react-redux'


const MainBrosweContainer = () => {

   // get the data from the store  
   const movies = useSelector ((store)=>store.movies?.nowPlayingMovies);

   if(!movies) return;

   //Choose the first movie of the list
   const mainMovie = movies[0];
  //  console.log(mainMovie)
        
   const {original_title, overview, id} = mainMovie;

  return (
    <>
    <TopVideoTitle title={original_title} overview={overview} />
    <VideoBackground movieId={id} />
    </>
  )
}

export default MainBrosweContainer