import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: 'a671f7524d97836b3853115348c4c13a',
            query: searchTerm,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
  };

  const handleMovieClick = movieId => {
    navigate(`/movies/${movieId}?query=${searchTerm}`);
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  search: `?query=${searchTerm}`,
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;
