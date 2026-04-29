import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import NotFound404 from './NotFound404'


const Trailer = () => {

  const navigate = useNavigate();
  const {pathname} = useLocation()
  const category = pathname.includes("movie") ? "movie" : "tv"
  const ytvideo = useSelector((state)=> state[category].info.videos);    // if given state have movie or tv category then put it here (this method is use for bringing dynamic keys)


//   console.log(pathname.includes("movie"), ytvideo)

  return (
    
    <div className='fixed left-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/95 p-4 text-white backdrop-blur'>
        <button title='Previous page' onClick={() => navigate(-1)} className="absolute left-[5%] top-[5%] z-[150] grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-3xl duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]">
          <i className="ri-arrow-left-line"></i>
        </button>

        {ytvideo ? (

        <div className="aspect-video w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0D0F14] shadow-2xl shadow-black">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${ytvideo.key}`} controls width="100%" height="100%" /> 
        </div>
    
  ) : ( 
        <NotFound404  /> 

   )}
  </div>
  );
}

export default Trailer
