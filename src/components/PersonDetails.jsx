import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  const [category, setcategory] = useState('movie');

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  return info ? (
    <div className="px-4 sm:px-[10%] w-screen min-h-screen bg-[#000000]">
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-[#fff7ed] flex items-center gap-4 sm:gap-10 text-lg sm:text-xl">
        <Link
          title="Previous page"
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#F56009] cursor-pointer"
        ></Link>
      </nav>

      <div className="w-full flex flex-col sm:flex-row">
        {/* Left - Poster and Personal Info */}
        <div className="w-full sm:w-[30%]">
          <img
            className="h-auto sm:h-[35vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path || info.detail.backdrop_path
            }`}
            alt={info.detail.name}
          />

          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />

          <div className="text-2xl text-white flex gap-x-5">
            {[
              {
                title: 'Wikipedia Profile',
                href: `https://wikidata.org/wiki/${info.externalid.wikidata_id}`,
                icon: 'ri-earth-fill',
              },
              {
                title: 'Facebook Profile',
                href: `https://facebook.com/${info.externalid.facebook_id}`,
                icon: 'ri-facebook-circle-fill',
              },
              {
                title: 'Instagram Profile',
                href: `https://instagram.com/${info.externalid.instagram_id}`,
                icon: 'ri-instagram-fill',
              },
              {
                title: 'X (Twitter) Profile',
                href: `https://x.com/${info.externalid.twitter_id}`,
                icon: 'ri-twitter-x-line',
              },
            ].map((item, index) => (
              <a key={index} title={item.title} target="_blank" rel="noopener noreferrer" href={item.href}>
                <i className={`${item.icon} hover:text-[#F56009]`}></i>
              </a>
            ))}
          </div>

          <h1 className="text-2xl text-white font-semibold my-5">Personal Info:</h1>
          {[
            { label: 'Work', value: info.detail.known_for_department },
            { label: 'Gender', value: info.detail.gender === 2 ? 'Male' : 'Female' },
            { label: 'Born & Place', value: `${info.detail.birthday}, ${info.detail.place_of_birth}` },
            {
              label: 'Death-day',
              value: info.detail.deathday || 'Alive and Kickin😎',
            },
            { label: 'AKA', value: info.detail.also_known_as.join(', ') },
          ].map((item, index) => (
            <div key={index} className="text-lg flex items-center gap-2">
              <h1 className="text-white font-semibold">{item.label}:</h1>
              <h1 className="text-zinc-400">{item.value}</h1>
            </div>
          ))}
        </div>

        {/* Right - Details and Information */}
        <div className="w-full sm:w-[70%] sm:ml-[5%] mt-8 sm:mt-0">
          <h1 className="text-3xl sm:text-5xl text-white font-black mb-5">{info.detail.name}</h1>

          <h1 className="text-xl text-zinc-300 font-semibold">Biography:</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between items-center mt-5">
            <h1 className="text-xl text-zinc-400 font-semibold">Movies List:</h1>
            <Dropdown
              title="Category"
              options={['tv', 'movie']}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[#ffbe72] border-2 border-zinc-700 p-5">
            {info[category + 'Credits'].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>{c.name || c.title || c.original_title || c.original_name}</span>
                  {c.character && <span className="block ml-5">Character: {c.character}</span>}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
