

import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import MoviePoster from './components/MoviePoster';




const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const API_URL = `https://www.omdbapi.com/?s=${searchTerm}&apikey=b6fddf6c`;
  useEffect(() => {
    const searchMovies = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data.Search);
    }
    searchMovies()
  }, [searchTerm]);
  return (
    <div className="app">
      <h1>Api Movie Center</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}
        />
        <img
          src=
          "./src/store/9177086.png"
          alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
          ? (<div className="container">
            {movies.map((movie) => (
              <MoviePoster movie={movie} key={movie.imdbID} />
            ))}
          </div>) : (
            <div className="empty">
              <h2>No Movies found</h2>
            </div>
          )
      }
    </div>
  );
}

export default App
