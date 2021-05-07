import Header from './components/Header';
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { useState, useEffect } from 'react';

export default function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");

  const getTopAnime = async () => {
    const temp = await fetch (`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
    .then(data => data.json());

    setTopAnime(temp.top.slice(0,5));
  }

  const handleSearch = e => {
    e.preventDefault();

    getAnimeList(search);
  }

  const getAnimeList = async (query) => {
    const temp = await fetch (`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
    .then(data => data.json());

    setAnimeList(temp.results);
  }


  useEffect(() => {
    getTopAnime();
  }, [])


  return (
    <div className="App">
      <Header />
      <div classname="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent handleSearch={handleSearch} search={search} setSearch={setSearch} animeList={animeList} />
      </div>
    </div>
  );
}


