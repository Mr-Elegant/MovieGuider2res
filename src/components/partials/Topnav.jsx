import { useState, useEffect } from "react";
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
    <div className="sticky top-0 z-40 flex w-full items-center px-4 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="relative flex w-full max-w-3xl items-center rounded-full border border-white/10 bg-white/[0.06] px-4 shadow-xl shadow-black/10">
      <i className="text-2xl text-zinc-400 ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full bg-transparent px-4 py-3 text-base text-zinc-100 outline-none placeholder:text-zinc-500 sm:py-4 sm:text-lg"
        type="text"
        placeholder="Search movies, shows, actors"
      />

      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="cursor-pointer text-2xl text-zinc-300 duration-300 hover:text-[#F56009] ri-close-fill"
        ></i>
      )}
      </div>

      {query && (
        <div className="absolute left-4 top-[calc(100%-0.25rem)] z-50 max-h-[55vh] w-[calc(100%-2rem)] overflow-auto rounded-2xl border border-white/10 bg-[#141519]/95 shadow-2xl shadow-black/40 backdrop-blur sm:left-8 sm:w-[min(42rem,calc(100%-4rem))] lg:left-10">
          {searches.length > 0 ? (
            searches.map((s, i) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                key={i}
                className="flex items-center border-b border-white/5 p-4 font-semibold text-zinc-300 duration-300 last:border-b-0 hover:bg-white/10"
              >
                <img
                  src={s.backdrop_path || s.profile_path || s.poster_path || s.images ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path || s.poster_path || s.images}` : noimage2}
                  alt=""
                  className="mr-4 h-16 w-16 rounded-xl object-cover shadow-lg"
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
