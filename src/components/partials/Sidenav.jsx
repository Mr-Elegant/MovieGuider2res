import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="lg:w-[15%] w-full lg:block">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-4 text-white"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? <RiCloseLine size={30} /> : <RiMenu3Line size={30} />}
      </button>

      {/* Sidebar Content */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block h-full border-r-2 border-zinc-400 p-10 bg-[#1F1E24]`}
      >
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#F56009] ri-tv-fill mr-2"></i>
          <span className="text-2xl text-[#F56009]"> Movie Guider 2 </span>
        </h1>

        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">New Feeds</h1>

          {[
            { path: "/trending", icon: "ri-fire-fill", label: "Trending" },
            { path: "/popular", icon: "ri-star-fill", label: "Popular" },
            { path: "/movie", icon: "ri-movie-2-fill", label: "Movies" },
            { path: "/tv", icon: "ri-tv-fill", label: "TV Shows" },
            { path: "/person", icon: "ri-group-fill", label: "Actors" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="hover:bg-[#F56009] hover:text-white hover:font-bold duration-300 rounded-lg p-5"
            >
              <i className={`text-[#F56009] ${item.icon} mr-2`}></i>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* <hr className="border-none h-[1px] bg-[#F56009] mt-5" />

        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">Website Information</h1>

          {[
            { label: "About", icon: "ri-information-fill" },
            { label: "Contact Us", icon: "ri-phone-fill" },
          ].map((item, i) => (
            <Link
              key={i}
              className="hover:bg-[#F56009] hover:text-white hover:font-bold duration-300 rounded-lg p-5"
            >
              <i className={`text-[#F56009] ${item.icon} mr-2`}></i>
              {item.label}
            </Link>
          ))}
        </nav> */}
      </div>
    </div>
  );
};

export default Sidenav;
