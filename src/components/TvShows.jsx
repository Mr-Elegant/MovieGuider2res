import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './partials/Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

const TvShows = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState('airing_today');
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = 'TV Guider 2 - TV Shows: ' + category.toLocaleUpperCase();

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const refereshHandler = () => {
    setpage(1);
    settv([]);
    GetTv();
  };

  useEffect(() => {
    refereshHandler();
  }, [category]);

  return tv.length > 0 ? (
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
            <h1 className="text-2xl font-black sm:text-4xl">TV Shows</h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/20 lg:flex-row lg:items-center lg:justify-between">
          <Topnav />
          <div className="flex flex-col gap-3 sm:flex-row">
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "on_the_air", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
          </div>
        </div>
      </div>

      <div id="scrollableDiv" className="flex-1 overflow-y-auto">
        <InfiniteScroll
          dataLength={tv.length}
          next={GetTv}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
        >
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
      </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
