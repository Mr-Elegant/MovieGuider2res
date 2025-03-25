import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound404 from './NotFound404'


const Trailer = () => {

  const navigate = useNavigate();
  const {pathname} = useLocation()
  const category = pathname.includes("movie") ? "movie" : "tv"
  const ytvideo = useSelector((state)=> state[category].info.videos);    // if given state have movie or tv category then put it here (this method is use for bringing dynamic keys)


//   console.log(pathname.includes("movie"), ytvideo)

  return (
    
    <div className='absolute bg-[rgba(0,0,0,.9)] z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center text-white'>
        <Link title='Previous page' onClick={() => navigate(-1)} className="z-[150] absolute ri-arrow-left-line  text-3xl left-[5%] top-[5%] hover:text-[#F56009]"></Link>

        {ytvideo ? (

        <ReactPlayer url={`https://www.youtube.com/watch?v=${ytvideo.key}`} controls  width="80vw" height="60vh"  /> 
    
  ) : ( 
        <NotFound404  /> 

   )}
  </div>
  );
}

export default Trailer