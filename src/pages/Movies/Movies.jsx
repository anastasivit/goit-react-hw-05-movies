import { MoviesList } from '../../components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesByQuery } from '../../services/api';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const searchQuery = searchParams.get('query');
    if (!searchQuery) {
      return;
    }
    console.log(searchQuery);
    getMoviesByQuery(searchQuery)
      .then(setMovies)
      .finally(() => setSearchParams({ query: searchQuery }));
  }, [searchParams]);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!query) {
      return;
    }
    setSearchParams({ query });
  };

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Movies</div>
        <input type="text" name="query" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <MoviesList movies={movies}></MoviesList>
    </div>
  );
};

export default Movies;
