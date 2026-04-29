import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './partials/Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import StateMessage from './partials/StateMessage';

const Movie = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState('now_playing');
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');
  const [minRating, setminRating] = useState('0');
  const [year, setyear] = useState('');

  document.title = 'Movie Guider 2 - Movies: ' + category.toLocaleUpperCase();

  const GetMovie = async (pageToLoad = page, replace = false) => {
    try {
      seterror('');
      const { data } = await axios.get(`/movie/${category}?page=${pageToLoad}`);
      if (data.results.length > 0) {
        setmovie((prevState) => replace ? data.results : [...prevState, ...data.results]);
        setpage(pageToLoad + 1);
        sethasMore(true);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log('Error: ', error);
      seterror('Unable to load movies right now.');
    } finally {
      setloading(false);
    }
  };

  const refereshHandler = () => {
    setloading(true);
    setpage(1);
    setmovie([]);
    sethasMore(true);
    GetMovie(1, true);
  };

  useEffect(() => {
    refereshHandler();
  }, [category]);

  const filteredMovies = movie.filter((item) => {
    const ratingMatch = !minRating || item.vote_average >= Number(minRating);
    const yearMatch = !year || item.release_date?.startsWith(year);
    return ratingMatch && yearMatch;
  });

  if (loading) return <Loading variant="grid" />;
  if (error) return <StateMessage title="Something went wrong" message={error} actionLabel="Try again" onAction={refereshHandler} />;
  if (movie.length === 0) return <StateMessage title="No movies found" message="Try another category." />;

  return (
    <div className="min-h-screen w-screen bg-[#0D0F14] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,96,9,0.14),transparent_35%)]" />
      <div className="relative flex min-h-screen flex-col">
      <div className="px-4 py-5 sm:px-8 lg:px-10">
        <div className="mb-5 flex items-center gap-3 text-white">
          <button title="Previous Page" onClick={() => navigate(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]">
            <i className="ri-arrow-left-line"></i>
          </button>
          <button title="HomePage" onClick={() => navigate('/')} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]">
            <i className="ri-home-3-fill"></i>
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F56009]">{category.replaceAll('_', ' ')}</p>
            <h1 className="text-2xl font-black sm:text-4xl">Movies</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/20 lg:flex-row lg:items-center lg:justify-between">
          <Topnav />
          <div className="flex flex-col gap-3 sm:flex-row">
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
          <select value={minRating} onChange={(e) => setminRating(e.target.value)} aria-label="Minimum rating">
            <option value="0">Any rating</option>
            <option value="6">6+ rating</option>
            <option value="7">7+ rating</option>
            <option value="8">8+ rating</option>
          </select>
          <input value={year} onChange={(e) => setyear(e.target.value.replace(/\D/g, '').slice(0, 4))} className="h-12 rounded-full border border-white/10 bg-white/[0.06] px-5 font-bold text-white outline-none placeholder:text-zinc-500" placeholder="Year" />
          </div>
        </div>
      </div>

      <div id="scrollableDiv" className="flex-1 overflow-y-auto">
        <InfiniteScroll
          dataLength={movie.length}
          next={() => GetMovie(page)}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
        >
          {filteredMovies.length > 0 ? <Cards data={filteredMovies} title="movie" /> : <StateMessage title="No filtered matches" message="Adjust the rating or year filter." />}
        </InfiniteScroll>
      </div>
      </div>
    </div>
  );
};

export default Movie;
