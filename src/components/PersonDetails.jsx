import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';

const PersonDetails = () => {
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
    <div className="min-h-screen w-screen bg-[#0D0F14] px-4 pb-10 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,96,9,0.12),transparent_34%)]" />
      <div className="relative">
        <nav className="flex min-h-20 w-full items-center gap-3 py-5 text-xl text-white">
          <button
            title="Previous page"
            onClick={() => navigate(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.08] duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
        </nav>

        <section className="flex w-full flex-col gap-8 lg:flex-row">
          <aside className="w-full lg:w-[30%]">
            <img
              className="w-full max-w-sm rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black/40"
              src={`https://image.tmdb.org/t/p/original/${
                info.detail.profile_path || info.detail.backdrop_path
              }`}
              alt={info.detail.name}
            />

            <div className="my-6 h-px bg-white/10" />

            <div className="flex flex-wrap gap-3 text-xl text-white">
              {[
                {
                  title: 'Wikipedia Profile',
                  href: `https://wikidata.org/wiki/${info.externalid.wikidata_id}`,
                  icon: 'ri-earth-fill',
                  show: info.externalid.wikidata_id,
                },
                {
                  title: 'Facebook Profile',
                  href: `https://facebook.com/${info.externalid.facebook_id}`,
                  icon: 'ri-facebook-circle-fill',
                  show: info.externalid.facebook_id,
                },
                {
                  title: 'Instagram Profile',
                  href: `https://instagram.com/${info.externalid.instagram_id}`,
                  icon: 'ri-instagram-fill',
                  show: info.externalid.instagram_id,
                },
                {
                  title: 'X Profile',
                  href: `https://x.com/${info.externalid.twitter_id}`,
                  icon: 'ri-twitter-x-line',
                  show: info.externalid.twitter_id,
                },
              ].filter((item) => item.show).map((item, index) => (
                <a key={index} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] duration-300 hover:border-[#F56009]/50 hover:text-[#F56009]" title={item.title} target="_blank" rel="noopener noreferrer" href={item.href}>
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>

            <h1 className="my-5 text-2xl font-bold text-white">Personal Info</h1>
            {[
              { label: 'Work', value: info.detail.known_for_department },
              { label: 'Gender', value: info.detail.gender === 2 ? 'Male' : info.detail.gender === 1 ? 'Female' : 'No information' },
              { label: 'Born & Place', value: [info.detail.birthday, info.detail.place_of_birth].filter(Boolean).join(', ') },
              { label: 'Death-day', value: info.detail.deathday || 'Alive' },
              { label: 'AKA', value: info.detail.also_known_as.join(', ') },
            ].map((item, index) => (
              <div key={index} className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <h1 className="text-sm font-bold uppercase tracking-[0.16em] text-[#F56009]">{item.label}</h1>
                <p className="mt-2 leading-6 text-zinc-300">{item.value || 'No information'}</p>
              </div>
            ))}
          </aside>

          <main className="w-full lg:w-[70%]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#F56009]">Actor profile</p>
            <h1 className="mb-5 text-4xl font-black text-white sm:text-6xl">{info.detail.name}</h1>

            <h1 className="text-2xl font-bold text-white">Biography</h1>
            <p className="mt-3 leading-7 text-zinc-300">{info.detail.biography || 'No biography available.'}</p>

            <HorizontalCards data={info.combinedCredits.cast} />

            <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F56009]">Credits</p>
                <h1 className="mt-2 text-2xl font-bold text-white">Movies List</h1>
              </div>
              <Dropdown
                title="Category"
                options={['tv', 'movie']}
                func={(e) => setcategory(e.target.value)}
              />
            </div>

            <div className="mt-5 h-[50vh] w-full overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/20">
              {info[category + 'Credits'].cast.map((c, i) => (
                <div
                  key={i}
                  className="cursor-pointer rounded-2xl p-4 text-zinc-300 duration-300 hover:bg-white/10 hover:text-white"
                >
                  <Link to={`/${category}/details/${c.id}`}>
                    <span className="font-bold">{c.name || c.title || c.original_title || c.original_name}</span>
                    {c.character && <span className="mt-1 block text-sm text-zinc-500">Character: {c.character}</span>}
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </section>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
