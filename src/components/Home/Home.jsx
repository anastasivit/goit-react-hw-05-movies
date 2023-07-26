import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const apiKey = 'a671f7524d97836b3853115348c4c13a';
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
