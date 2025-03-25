
import { Route, Routes } from 'react-router-dom'
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

const App = () => {
  return (
    <div className='bg-[#1F1E24] font-["satoshi"]  h-full w-full flex '>

      <Routes>
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
        <Route path='*'  element={<NotFound404 />} />
       
        
      </Routes>


    </div>
  )
}

export default App