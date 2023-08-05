import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
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

      if (searchTerm) {
        setSearchTerm('');
        navigate(`/movies/search?query=${searchTerm}`, {
          state: {
            from: location.pathname,
            movies: searchResults,
          },
        });
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
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
      {searchResults.length === 0 ? (
        <div>No results found</div>
      ) : (
        <ul>
          {searchResults.map(movie => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location.pathname, movies: searchResults }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default Movies;
