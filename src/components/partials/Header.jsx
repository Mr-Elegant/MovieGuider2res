import React from "react";
import {Link} from "react-router-dom"

const Header = ({ data }) => {
  // console.log(data);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)) ,
            url(https://image.tmdb.org/t/p/original/${
              data.backdrop_path ||
              data.profile_path ||
              data.poster_path
            })`,         
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {data.original_title || data.name || data.original_name || data.title}:
      </h1>

      {/* <p className="w-[70%] text-white">{data.overview.slice(0,200)}</p> */}
      {data.overview &&  <p className="w-[70%] mt-3 mb-3 text-white">{data.overview.slice(0,200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-[#F56009]">more</Link>
      </p> }
     
      <p className="text-white">
        <i className="text-[#F56009] ri-megaphone-fill mr-2 "></i> {data.release_date || "No Information"}{" "}
        <i className="text-[#F56009] ri-album-fill ml-5 mr-2"></i>{data.media_type && data.media_type.toUpperCase()}
      </p>
      <Link className="bg-[#F56009] p-4 mt-5 rounded-lg text-white font-md"
            to={`/${data.media_type}/details/${data.id}/trailer`}
      > Watch Trailer</Link>
    </div>
  );
};

export default Header;
