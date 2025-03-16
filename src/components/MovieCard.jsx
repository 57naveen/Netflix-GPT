import React from 'react'
import { CDN_IMG_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-48 pr-4 '>
        <img alt='Movie Card' src={CDN_IMG_URL + posterPath}/>
    </div>
  )
}

export default MovieCard