
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/Home.jsx'
import Trending from './components/Trending.jsx'
import Popular from './components/Popular.jsx'
import Movie from './components/Movie.jsx'
import TvShows from './components/TvShows.jsx'
import People from './components/People.jsx'
import MovieDetails from './components/MovieDetails.jsx'
import PersonDetails from './components/PersonDetails.jsx'
import TvDetails from './components/TvDetails.jsx'
import Trailer from './components/partials/Trailer.jsx'
import NotFound404 from './components/partials/NotFound404.jsx'
import Watchlist from './components/Watchlist.jsx'

const App = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className='min-h-screen w-full bg-[#0D0F14] font-["satoshi"] page-fade'>

      <Routes location={location}>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />}  />
        <Route path='/movie/details/:id' element={<MovieDetails  />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path='/tv' element={<TvShows />} / >
        <Route path='/tv/details/:id' element={<TvDetails  />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path='/person' element={<People />} />
        <Route path='/person/details/:id' element={<PersonDetails  />} />
        <Route path='/watchlist' element={<Watchlist />} />
        <Route path='*'  element={<NotFound404 />} />
       
        
      </Routes>


    </div>
  )
}

export default App
