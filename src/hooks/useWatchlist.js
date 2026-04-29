import { useEffect, useMemo, useState } from 'react';
import { getWatchlist, saveWatchlist } from '../utils/watchlist';

const useWatchlist = () => {
  const [items, setItems] = useState(getWatchlist);

  useEffect(() => {
    const syncWatchlist = () => setItems(getWatchlist());
    window.addEventListener('watchlist-change', syncWatchlist);
    window.addEventListener('storage', syncWatchlist);

    return () => {
      window.removeEventListener('watchlist-change', syncWatchlist);
      window.removeEventListener('storage', syncWatchlist);
    };
  }, []);

  const ids = useMemo(() => new Set(items.map((item) => `${item.media_type}-${item.id}`)), [items]);

  const isSaved = (item) => ids.has(`${item.media_type}-${item.id}`);

  const toggle = (item) => {
    const key = `${item.media_type}-${item.id}`;
    const nextItems = ids.has(key)
      ? items.filter((saved) => `${saved.media_type}-${saved.id}` !== key)
      : [item, ...items];

    saveWatchlist(nextItems);
    setItems(nextItems);
  };

  return { items, isSaved, toggle };
};

export default useWatchlist;
