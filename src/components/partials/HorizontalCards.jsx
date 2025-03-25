import { Link } from "react-router-dom";
import noimage from '/No_Image.png';

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto  mb-5 p-5 flex gap-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="inline-block w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[20vw] h-[35vh] bg-zinc-800 rounded-lg flex-shrink-0 overflow-hidden"
          >
            <img
              className="w-full h-[55%] object-cover rounded-t-lg"
              src={
                d.backdrop_path || d.profile_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.profile_path || d.poster_path
                    }`
                  : noimage
              }
              alt=""
            />

            <div className="text-white p-3 h-[45%] flex flex-col justify-start gap-2">
              <h1 className="text-xl font-semibold truncate">
                {d.original_title || d.name || d.original_name || d.title}
              </h1>

              {d.overview && (
                <p className="text-sm sm:text-base md:text-lg leading-relaxed break-words">
                  {d.overview.slice(0, 100)}...
                  <span className="text-orange-100">more</span>
                </p>
              )}
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-white mt-5 text-3xl font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
