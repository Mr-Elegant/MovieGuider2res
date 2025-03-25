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
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
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
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-[#1F1E24]">
      <Sidenav />
      <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className="flex flex-col sm:flex-row justify-between p-5">
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-400">Trending:</h1>

          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e) => setcategory(e.target.value)} />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
