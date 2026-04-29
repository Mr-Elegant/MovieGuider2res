import { Link } from "react-router-dom";
import noimage from '/No_Image.png';

const HorizontalCards = ({ data }) => {
  return (
    <div className="flex w-full gap-5 overflow-x-auto pb-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="group inline-block h-[24rem] w-[78vw] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#171A21] shadow-xl shadow-black/20 duration-300 hover:-translate-y-1 hover:border-[#F56009]/50 sm:w-[22rem]"
          >
            <div className="relative h-[58%] overflow-hidden">
              <img
                className="h-full w-full object-cover duration-500 group-hover:scale-105"
                src={
                  d.backdrop_path || d.profile_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.profile_path || d.poster_path
                      }`
                    : noimage
                }
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-transparent to-transparent" />
              {d.media_type && (
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold uppercase text-white backdrop-blur">
                  {d.media_type}
                </span>
              )}
            </div>

            <div className="flex h-[42%] flex-col justify-start gap-3 p-4 text-white">
              <h1 className="truncate text-xl font-bold">
                {d.original_title || d.name || d.original_name || d.title}
              </h1>

              {d.overview && (
                <p className="line-clamp-3 text-sm leading-6 text-zinc-300">
                  {d.overview.slice(0, 100)}...
                  <span className="ml-1 font-semibold text-[#FF8A35]">more</span>
                </p>
              )}
            </div>
          </Link>
        ))
      ) : (
        <h1 className="mt-5 w-full text-center text-3xl font-black text-white">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
