import { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./partials/Loading";

const Home = () => {
  document.title = "Movie Guider 2 | HomePage";

  const [wallpaper, setwallpaper] = useState([]);
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/week`);
      let randomdata = data.results[Math.floor(Math.random() * data.results.length)];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/week`);
      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#0D0F14] text-white lg:flex-row">
      <Sidenav />
      <main className="relative h-full w-full flex-1 overflow-y-auto overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,96,9,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
        <div className="relative">
        <Topnav />
        <Header data={wallpaper} />

        <section className="px-4 pb-8 pt-6 sm:px-8 lg:px-10">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#F56009]">
                This week
              </p>
              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Trending picks
              </h1>
            </div>

            <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e) => setcategory(e.target.value)} />
          </div>

          <HorizontalCards data={trending} />
        </section>
        </div>
      </main>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
