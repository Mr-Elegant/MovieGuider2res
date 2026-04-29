import { Link } from "react-router-dom";

const Header = ({ data }) => {
  const title = data.original_title || data.name || data.original_name || data.title;
  const releaseInfo = data.release_date || data.first_air_date || "No Information";
  const mediaType = data.media_type && data.media_type.toUpperCase();

  return (
    <section className="relative mx-4 min-h-[62vh] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30 sm:mx-8 lg:mx-10">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path || data.poster_path
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0F14] via-[#0D0F14]/78 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-transparent to-black/20" />

      <div className="relative flex min-h-[62vh] max-w-4xl flex-col justify-end px-5 py-8 sm:px-10 lg:px-14 lg:py-12">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-zinc-200">
          <span className="rounded-full border border-[#F56009]/40 bg-[#F56009]/15 px-4 py-2 text-[#FFB071]">
            Featured this week
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
            <i className="text-[#F56009] ri-calendar-event-fill mr-2"></i>
            {releaseInfo}
          </span>
          {mediaType && (
            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <i className="text-[#F56009] ri-movie-2-fill mr-2"></i>
              {mediaType}
            </span>
          )}
        </div>

        <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
          {title}
        </h1>

        {data.overview && (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-200 sm:text-base">
            {data.overview.slice(0, 210)}...
            <Link to={`/${data.media_type}/details/${data.id}`} className="ml-1 font-semibold text-[#FF8A35]">
              more
            </Link>
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-[#F56009] px-6 py-3 font-semibold text-white shadow-lg shadow-[#F56009]/25 duration-300 hover:bg-[#ff751f]"
            to={`/${data.media_type}/details/${data.id}/trailer`}
          >
            <i className="ri-play-fill text-xl"></i>
            Watch Trailer
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur duration-300 hover:bg-white/15"
            to={`/${data.media_type}/details/${data.id}`}
          >
            <i className="ri-information-fill text-xl"></i>
            Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
