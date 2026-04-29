import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import StateMessage from './partials/StateMessage';

const Trending = () => {
  const navigate = useNavigate();

  const [category, setcategory] = useState('all');
  const [duration, setduration] = useState('day');
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');

  document.title = 'Movie Guider 2 - Trending: ' + category.toLocaleUpperCase();

  const GetTrending = async (pageToLoad = page, replace = false) => {
    try {
      seterror('');
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${pageToLoad}`);
      if (data.results.length > 0) {
        settrending((prevState) => replace ? data.results : [...prevState, ...data.results]);
        setpage(pageToLoad + 1);
        sethasMore(true);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log('Error: ', error);
      seterror('Unable to load trending titles right now.');
    } finally {
      setloading(false);
    }
  };

  const refereshHandler = () => {
    setloading(true);
    setpage(1);
    settrending([]);
    sethasMore(true);
    GetTrending(1, true);
  };

  useEffect(() => {
    refereshHandler();
  }, [category, duration]);

  if (loading) return <Loading variant="grid" />;
  if (error) return <StateMessage title="Something went wrong" message={error} actionLabel="Try again" onAction={refereshHandler} />;
  if (trending.length === 0) return <StateMessage title="No results found" message="Try another category or duration." />;

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
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F56009]">Explore</p>
            <h1 className="text-2xl font-black sm:text-4xl">Trending</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/20 lg:flex-row lg:items-center lg:justify-between">
          <Topnav />
          <div className="flex flex-col gap-3 sm:flex-row">
          <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
          <Dropdown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />
          </div>
        </div>
      </div>

      <div id="scrollableDiv" className="flex-1 overflow-y-auto">
        <InfiniteScroll
          dataLength={trending.length}
          next={() => GetTrending(page)}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
        >
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      </div>
      </div>
    </div>
  );
};

export default Trending;
