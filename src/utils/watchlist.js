const WATCHLIST_KEY = 'movie-guider-watchlist';

export const getWatchlist = () => {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveWatchlist = (items) => {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('watchlist-change'));
};

export const makeWatchItem = (item, mediaType) => ({
  id: item.id,
  media_type: mediaType || item.media_type,
  title: item.title || item.name || item.original_title || item.original_name,
  poster_path: item.poster_path || item.profile_path || item.backdrop_path,
  vote_average: item.vote_average,
  release_date: item.release_date || item.first_air_date,
});
