import React, { useState } from 'react'
import { useEffect } from 'react';
import "./App.css"
import SearchIcon from "./search.svg"
import MovieCrad from './MovieCrad';

// d9375563

const API_URL = "http://www.omdbapi.com?apikey=d9375563";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("")

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  }

  useEffect(() => {
    searchMovies("Marvel")
  }, [])


  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input type="text" placeholder='Search for the movies' value={movieName} onChange={(event) => {
          setMovieName(() => { return event.target.value })
        }} />
        <img src={SearchIcon} alt="searchIcon" onClick={() => { searchMovies(movieName) }} />
      </div>

      {
        ((typeof(movies) !== "undefined") && (movies.length > 0)) ?
          (
            <div className="container">
              {
                movies.map((movie, index) => {
                  return (
                    < MovieCrad
                      key={index}
                      props={movie}
                    />
                  )
                })
              }
            </div>
          ) :
          (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App