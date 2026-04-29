import { Link } from 'react-router-dom'
import noimage from '/No_Image.png'
import useWatchlist from '../../hooks/useWatchlist'
import { makeWatchItem } from '../../utils/watchlist'

const Cards = ({data, title}) => {
  const { isSaved, toggle } = useWatchlist();

  return (
    <div className='grid w-full grid-cols-2 gap-5 px-4 pb-10 sm:grid-cols-3 sm:px-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {data.map((c,i)=> (
            <div className='group relative overflow-hidden rounded-2xl border border-white/10 bg-[#171A21] shadow-xl shadow-black/20 duration-300 hover:-translate-y-1 hover:border-[#F56009]/50' key={i}>
              <Link to={`/${c.media_type || title }/details/${c.id}`}>
                <div className='relative aspect-[2/3] overflow-hidden bg-[#101217]'>
                  <img className='h-full w-full object-cover duration-500 group-hover:scale-105' src={ c.images || c.poster_path ||c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${ c.images || c.poster_path ||c.backdrop_path || c.profile_path }`: noimage } alt=''  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#171A21] via-transparent to-transparent opacity-90'></div>
                  {c.vote_average && (
                    <span className='absolute right-3 top-3 rounded-full bg-[#F56009] px-2.5 py-1 text-xs font-black text-white shadow-lg shadow-[#F56009]/30'>
                      {c.vote_average.toFixed(1)}
                      <i className="ri-star-fill pl-1"></i>
                    </span>
                  )}
                </div>
              </Link>

                <button
                  title={isSaved(makeWatchItem(c, c.media_type || title)) ? 'Remove from watchlist' : 'Add to watchlist'}
                  onClick={() => toggle(makeWatchItem(c, c.media_type || title))}
                  className='absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-lg text-white backdrop-blur duration-300 hover:bg-[#F56009]'
                >
                  <i className={isSaved(makeWatchItem(c, c.media_type || title)) ? 'ri-bookmark-fill' : 'ri-bookmark-line'}></i>
                </button>

                <div className='p-3'>
                <Link to={`/${c.media_type || title }/details/${c.id}`}>
                  <h1 className='line-clamp-2 min-h-12 text-base font-bold leading-6 text-zinc-100 duration-300 group-hover:text-[#FF8A35]'>{c.original_title || c.name || c.original_name || c.title}</h1>
                  {(c.release_date || c.first_air_date || c.media_type) && (
                    <p className='mt-2 truncate text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500'>
                      {c.media_type || title} {c.release_date || c.first_air_date ? `- ${(c.release_date || c.first_air_date).slice(0, 4)}` : ''}
                    </p>
                  )}
                </Link>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Cards
