import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './partials/Loading';
import Topnav from './partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

const People = () => {
  const navigate = useNavigate();
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = 'Movie Guider 2 - Actors';

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setperson((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const refereshHandler = () => {
    setpage(1);
    setperson([]);
    GetPerson();
  };

  useEffect(() => {
    refereshHandler();
  }, []);

  return person.length > 0 ? (
    <div className="w-screen min-h-screen bg-[#1F1E24] flex flex-col">
      <div className="px-4 sm:px-[5%] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl text-white font-semibold hover:text-[#ffeed4] flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line cursor-pointer text-[#fff7ed] hover:text-[#F56009] mr-2"
          ></i>
          <i
            title="HomePage"
            onClick={() => navigate('/')}
            className="p-2 ri-home-3-fill cursor-pointer text-[#fff7ed] mr-2 hover:text-[#F56009] ml-2"
          ></i>
          Popular Actors:
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
          <Topnav />
        </div>
      </div>

      <div id="scrollableDiv" className="flex-1 overflow-y-auto mt-4">
        <InfiniteScroll
          dataLength={person.length}
          next={GetPerson}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
        >
          <Cards data={person} title="person" />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
