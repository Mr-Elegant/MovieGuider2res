import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadtv, removetv } from '../store/actions/tvActions';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id, dispatch]);

  const year = info?.detail?.first_air_date?.split('-')[0];

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(13,15,20,.98),rgba(13,15,20,.84),rgba(13,15,20,.58)),
              url(https://image.tmdb.org/t/p/original/${
                info.detail.backdrop_path || info.detail.poster_path
              })`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="relative min-h-screen w-screen bg-[#0D0F14] px-4 pb-10 text-white sm:px-8 lg:px-10"
    >
      <nav className="flex min-h-20 w-full items-center gap-3 py-5 text-xl text-white">
        <button title="Previous page" onClick={() => navigate(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.08] duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]">
          <i className="ri-arrow-left-line"></i>
        </button>
        {info.externalid.wikidata_id && (
          <a className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.08] duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]" title="Wikipedia link" target="_blank" rel="noopener noreferrer" href={`https://wikidata.org/wiki/${info.externalid.wikidata_id}`}>
            <i className="ri-earth-fill"></i>
          </a>
        )}
        {info.detail.homepage && (
          <a className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.08] duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]" title="Official Website" target="_blank" rel="noopener noreferrer" href={info.detail.homepage}>
            <i className="ri-external-link-fill"></i>
          </a>
        )}
        {info.externalid.imdb_id && (
          <a className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.08] duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]" title="IMDb link" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>
            <i className="ri-database-2-fill"></i>
          </a>
        )}
      </nav>

      <section className="flex flex-col gap-8 lg:flex-row">
        <img className="w-full max-w-sm rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black/40 lg:w-[22rem]" src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`} alt="TV Poster" />

        <div className="max-w-5xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#F56009]">TV details</p>
          <h1 className="text-4xl font-black leading-tight sm:text-6xl">
            {info.detail.name || info.detail.title || info.detail.original_title || info.detail.original_name}
            {year && <small className="ml-2 text-2xl font-bold text-zinc-300">({year})</small>}
          </h1>

          <div className="mb-6 mt-5 flex flex-wrap items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#F56009] text-lg font-black text-white shadow-lg shadow-[#F56009]/25">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 font-semibold">User Score</span>
            {info.detail.first_air_date && <span className="rounded-full bg-white/10 px-4 py-2">{info.detail.first_air_date}</span>}
            <span className="rounded-full bg-white/10 px-4 py-2">{info.detail.genres.map((g) => g.name).join(', ')}</span>
            {info.detail.episode_run_time?.[0] && <span className="rounded-full bg-white/10 px-4 py-2">{info.detail.episode_run_time[0]} min</span>}
          </div>

          {info.detail.tagline && <h1 className="text-lg font-semibold italic text-zinc-200 sm:text-xl">{info.detail.tagline}</h1>}

          <h1 className="mt-6 text-2xl font-bold">Overview</h1>
          <p className="mt-2 max-w-4xl leading-7 text-zinc-300">{info.detail.overview}</p>

          <h1 className="mt-6 text-2xl font-bold">Languages</h1>
          <p className="mt-2 mb-8 max-w-4xl leading-7 text-zinc-300">{info.translations.join(', ')}</p>

          <Link className="inline-flex items-center rounded-full bg-[#F56009] px-6 py-3 font-bold shadow-lg shadow-[#F56009]/25 duration-300 hover:bg-[#ff751f]" to={`${pathname}/trailer`}>
            <i className="ri-play-fill text-xl mr-2"></i>Watch Trailer
          </Link>
        </div>
      </section>

      <div className="mt-10 flex w-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
        {['flatrate', 'rent', 'buy'].map((type) => (
          info.watchproviders && info.watchproviders[type] && (
            <div key={type} className="flex flex-wrap items-center gap-4 text-white">
              <h1 className="min-w-44 font-bold">Available {type === 'flatrate' ? 'on Platforms' : type === 'rent' ? 'for Rent' : 'to Buy'}</h1>
              {info.watchproviders[type].map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="h-12 w-12 rounded-xl object-cover shadow-lg"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )
        ))}
      </div>

      {/* Seasons */}
      <div className="mt-10 mb-5 h-px bg-white/10" />
      <h1 className="text-2xl font-bold text-white sm:text-3xl">Seasons</h1>
      <div className="mb-5 flex w-full gap-5 overflow-x-auto py-5">
        {info.detail.seasons.map((s, i) => (
          <div key={i} className="w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#171A21]">
            <img className="aspect-[2/3] w-full object-cover" src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} alt={s.name} />
            <h1 className="p-3 text-base font-bold text-zinc-200">{s.name}</h1>
          </div>
        ))}
      </div>

      <div className="mt-10 mb-5 h-px bg-white/10" />
      <h1 className="text-2xl font-bold text-white sm:text-3xl">TV Recommendations & Similar Shows</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
