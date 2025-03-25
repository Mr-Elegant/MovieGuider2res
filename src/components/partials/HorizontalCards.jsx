import { Link } from "react-router-dom";
import noimage from '/No_Image.png'


const HorizontalCards = ({ data }) => {
  // console.log("h card data" , data);
  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 p-5 ">
      {data.length > 0 ? data.map((d, i) => (
        <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[15%] h-[35vh] bg-zinc-800 m-5 mb-5 rounded-lg">
          <img
            className="w-full h-[55%] object-cover"
            src={d.backdrop_path || d.profile_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.profile_path || d.poster_path
            }`: noimage}
            alt=""
          />

          <div className="text-white p-3 h-[45%] overflow-y-auto">
            <h1 className="text-xl font-semibold">
              {d.original_title || d.name || d.original_name || d.title}:
            </h1>

            {/* <p className="w-[70%] text-white">{data.overview.slice(0,200)}</p> */}
            {d.overview && (
              <p className="">
                {d.overview.slice(0, 50)}...
                <span className="text-orange-100">more</span>
              </p>
            )}
          </div>
        </Link>
      )) : (
        <h1 className="text-white mt-5 text-3xl font-black text-center ">Nothing to show</h1>
      )

    }
    </div>
  );
};

export default HorizontalCards;