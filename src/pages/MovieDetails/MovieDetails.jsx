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
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [linksClicked, setLinksClicked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getMoviesDetails(id)
      .then(setDetails)
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });

    getMoviesCast(id)
      .then(setCast)
      .catch(error => {
        console.error('Error fetching cast:', error);
        setLinksClicked(true); // Show message when clicked
      });

    getMoviesReviews(id)
      .then(setReviews)
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setLinksClicked(true); // Show message when clicked
      });
  }, [id]);

  if (!details) {
    return <h1>Loading...</h1>;
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

      <CastReviewsContainer>
        <Link
          to="cast"
          state={{ from: location.state ? location.state.from : '/movies' }}
          onClick={() => setLinksClicked(true)}
        >
          Cast
        </Link>
        <Link
          to="reviews"
          state={{ from: location.state ? location.state.from : '/movies' }}
          onClick={() => setLinksClicked(true)}
        >
          Reviews
        </Link>
      </CastReviewsContainer>

      {linksClicked && cast.length === 0 && reviews.length === 0 && (
        <p>We don't have cast or reviews for this movie.</p>
      )}

      {cast.length > 0 && <div>{/* Render cast information */}</div>}

      {reviews.length > 0 && <div>{/* Render reviews */}</div>}

      <Outlet />
    </Container>
  );
};

export default MovieDetails;
