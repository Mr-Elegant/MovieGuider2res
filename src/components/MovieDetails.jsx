import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => dispatch(removemovie());
  }, [id, dispatch]);

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)),
              url(https://image.tmdb.org/t/p/original/${
                info.detail.backdrop_path || info.detail.poster_path
              })`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="relative w-screen min-h-screen px-4 sm:px-[10%]"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-[#fff7ed] flex items-center gap-4 sm:gap-10 text-lg sm:text-xl">
        <Link title="Previous page" onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#F56009] cursor-pointer"></Link>
        <a title="Wikipedia link" target="_blank" rel="noopener noreferrer" href={`https://wikidata.org/wiki/${info.externalid.wikidata_id}`}>
          <i className="ri-earth-fill hover:text-[#F56009]"></i>
        </a>
        <a title="Official Website" target="_blank" rel="noopener noreferrer" href={info.detail.homepage}>
          <i className="ri-external-link-fill hover:text-[#F56009]"></i>
        </a>
        <a title="IMDb link" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>
          <i className="ri-database-2-fill hover:text-[#F56009]"></i>
        </a>
      </nav>

      {/* Movie Details */}
      <div className="flex flex-col sm:flex-row text-white mt-8">
        <img className="h-auto sm:h-[50vh] object-cover rounded-lg" src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`} alt="Movie Poster" />

        <div className="content mt-6 sm:mt-0 sm:ml-8">
          <h1 className="text-3xl sm:text-5xl font-black">
            {info.detail.name || info.detail.title || info.detail.original_title || info.detail.original_name}
            <small className="text-lg sm:text-2xl font-bold text-zinc-200"> ({info.detail.release_date.split('-')[0]})</small>
          </h1>

          <div className="mt-3 mb-5 flex flex-wrap items-center gap-4">
            <span className="text-white rounded-full text-xl font-semibold bg-[#fe9739] w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
            <h1 className="font-semibold text-lg sm:text-2xl">User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(', ')}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-lg sm:text-xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>

          <h1 className="text-xl sm:text-2xl mt-5 font-semibold">Overview:</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-xl sm:text-2xl mt-5 font-semibold">Languages:</h1>
          <p className="mb-10">{info.translations.join(', ')}</p>

          <Link className="p-4 sm:p-5 bg-[#F56009] rounded-full" to={`${pathname}/trailer`}>
            <i className="ri-play-fill text-xl mr-2"></i>Watch Trailer
          </Link>
        </div>
      </div>

      {/* Watch Providers */}
      <div className="w-full sm:w-[80%] flex flex-col gap-5 mt-10">
        {['flatrate', 'rent', 'buy'].map((type) => (
          info.watchproviders && info.watchproviders[type] && (
            <div key={type} className="flex flex-wrap items-center text-white gap-4">
              <h1>Available {type === 'flatrate' ? 'on Platforms' : type === 'rent' ? 'for Rent' : 'to Buy'}</h1>
              {info.watchproviders[type].map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )
        ))}
      </div>

      {/* Recommendations */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Movie Recommendations & Similar Movies</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
