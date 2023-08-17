import React, { useEffect, useState } from 'react';
import { BASE_IMG_URL } from 'services/constans';
import {
  Link,
  Container,
  Poster,
  Details,
  CastReviewsContainer,
  BackButton,
  InfoContainer,
} from './MovieDetails.styled';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getMoviesDetails,
  getMoviesCast,
  getMoviesReviews,
} from '../../services/api';

const MovieDetails = () => {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getMoviesDetails(id).then(setDetails);
    getMoviesCast(id).then(setCredits);
    getMoviesReviews(id).then(setReviews);
  }, [id]);

  if (!details) {
    return <h1>Error</h1>;
  }

  const handleGoBack = () => {
    navigate(location.state.from);
  };

  return (
    <Container>
      <BackButton type="button" onClick={handleGoBack}>
        Back to movies
      </BackButton>

      <InfoContainer>
        <Poster src={BASE_IMG_URL + details.poster_path} alt={details.title} />

        <Details>
          <h2>{details.title}</h2>
          <p>User Score: {details.userScore}%</p>
          <p>{details.overview}</p>
          <p>Genres: {details.genres.map(genre => genre.name).join(', ')}</p>
        </Details>
      </InfoContainer>

      {credits.length > 0 && (
        <CastReviewsContainer>
          <Link to="cast" state={{ from: location.state.from }}>
            Cast
          </Link>
          <Link to="reviews" state={{ from: location.state.from }}>
            Reviews
          </Link>
        </CastReviewsContainer>
      )}

      <Outlet />
    </Container>
  );
};

export default MovieDetails;
