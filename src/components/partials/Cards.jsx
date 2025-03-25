import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/No_Image.png'

const Cards = ({data, title}) => {
  // console.log(title)
  return (
    <div className='flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24] '>
        {data.map((c,i)=> (
            <Link to={`/${c.media_type || title }/details/${c.id}`} className='relative w-[25vh] mr-[5%] mb-[5%] ' key={i}>
                <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={ c.images || c.poster_path ||c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${ c.images || c.poster_path ||c.backdrop_path || c.profile_path }`: noimage } alt=''  />

                <h1 className='text-2xl text-zinc-300 mt-3 font-semibold hover:text-[#F56009]'>{c.original_title || c.name || c.original_name || c.title}
                  {c.vote_average && ( <small className=' pl-2 text-[#fe9739]'>{c.vote_average.toFixed(1)}<i className="text-[#fe9739] pl-1 ri-star-fill text-xm"></i></small>) }
                   </h1>

                {/* <div className='absolute text-white right-[-10%] botton-[30%] rounded-full text-xl font-semibold bg-[#fe9739] w-[5vh] h-[5vh] flex justify-center items-center'>
                  {c.vote_average}
                </div> */}
 
                
            </Link>
        ))}
    </div>
  )
}

export default Cards