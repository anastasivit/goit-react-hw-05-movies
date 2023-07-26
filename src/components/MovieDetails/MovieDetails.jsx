import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = 'a671f7524d97836b3853115348c4c13a';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,reviews`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title, poster_path, release_date, vote_average, overview, genres } =
    movieDetails;

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <div style={{ display: 'flex' }}>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            style={{ width: '200px', marginRight: '20px' }}
          />
        )}
        <div>
          <h2>
            {title} ({release_date && release_date.slice(0, 4)})
          </h2>
          <p>User Score: {vote_average * 10}%</p>
          <p>Overview: {overview}</p>
          <p>Genres: {genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div>
        <h3>
          <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        </h3>
        <h3>
          <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        </h3>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetails;
