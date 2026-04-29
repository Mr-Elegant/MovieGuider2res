import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <aside className="w-full border-white/10 bg-[#0D0F14] lg:h-full lg:w-72 lg:border-r">
      {/* Mobile Menu Button */}
      <button
        className="p-4 text-white lg:hidden"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? <RiCloseLine size={30} /> : <RiMenu3Line size={30} />}
      </button>

      {/* Sidebar Content */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } h-full bg-[#0D0F14] px-5 pb-6 pt-2 lg:block lg:p-6`}
      >
        <h1 className="flex items-center gap-3 text-xl font-bold text-white">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F56009] text-white shadow-lg shadow-[#F56009]/25">
            <i className="ri-tv-fill text-2xl"></i>
          </span>
          <span>Movie Guider 2</span>
        </h1>

        <nav className="mt-10 flex flex-col gap-2 text-base font-semibold text-zinc-400">
          <h1 className="mb-3 px-4 text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">New Feeds</h1>

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
              className="group flex items-center rounded-2xl px-4 py-3 duration-300 hover:bg-white/10 hover:text-white"
            >
              <i className={`mr-3 text-xl text-[#F56009] duration-300 group-hover:scale-110 ${item.icon}`}></i>
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
    </aside>
  );
};

export default Sidenav;
