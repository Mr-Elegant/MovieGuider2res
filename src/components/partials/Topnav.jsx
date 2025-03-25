import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import noimage2 from "/no-image2.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (query) GetSearches();
  }, [query]);

  return (
    <div className="w-full px-4 sm:px-10 py-4 relative flex items-center rounded-lg">
      <i className="hover:text-[#F56009] text-2xl sm:text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full sm:w-[50%] mx-4 p-3 sm:p-5 text-lg sm:text-xl text-zinc-200 outline-none rounded-lg border-none bg-transparent"
        type="text"
        placeholder="Search"
      />

      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="hover:text-[#F56009] text-zinc-300 text-2xl sm:text-3xl ri-close-fill cursor-pointer"
        ></i>
      )}

      {query && (
        <div className="z-50 w-full sm:w-[60%] absolute max-h-[50vh] bg-[#141519] top-[100%] left-0 sm:left-[5%] overflow-auto rounded-lg shadow-lg">
          {searches.length > 0 ? (
            searches.map((s, i) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                key={i}
                className="flex items-center p-4 hover:bg-[#3d424f] duration-300 font-semibold text-zinc-400"
              >
                <img
                  src={s.backdrop_path || s.profile_path || s.poster_path || s.images ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path || s.poster_path || s.images}` : noimage2}
                  alt=""
                  className="w-[8vh] h-[8vh] object-cover rounded-lg mr-4 shadow-lg"
                />
                <span>{s.original_title || s.name || s.original_name || s.title}</span>
              </Link>
            ))
          ) : (
            <p className="text-zinc-400 p-4">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Topnav;
