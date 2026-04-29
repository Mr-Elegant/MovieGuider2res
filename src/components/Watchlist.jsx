import { useNavigate } from 'react-router-dom';
import Cards from './partials/Cards';
import StateMessage from './partials/StateMessage';
import useWatchlist from '../hooks/useWatchlist';

const Watchlist = () => {
  const navigate = useNavigate();
  const { items } = useWatchlist();

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
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F56009]">Saved</p>
              <h1 className="text-2xl font-black sm:text-4xl">Watchlist</h1>
            </div>
          </div>
        </div>

        {items.length > 0 ? (
          <Cards data={items} title="movie" />
        ) : (
          <StateMessage title="Your watchlist is empty" message="Save movies and shows with the bookmark button, then find them here." />
        )}
      </div>
    </div>
  );
};

export default Watchlist;
