import axios from 'axios';

const instance  = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmJjNWJmZDFlYTk0MzgyZjIyZWVlYjEyOGVlOTk5YiIsIm5iZiI6MTcxMTQ1NTM5NC42MzYsInN1YiI6IjY2MDJiY2EyMTk3ZGU0MDE2MzE4Y2ExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.58sg58ssC-nLwA2EAayvJxdZi9wVe0s0pBHRFwDGgEM'
      }

})

export default instance