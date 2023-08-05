import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Reviews = ({ movies }) => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const movie = movies.find(movie => movie.id.toString() === movieId);
        if (movie) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/reviews`,
            {
              params: {
                api_key: 'a671f7524d97836b3853115348c4c13a',
              },
            }
          );
          setReviews(response.data.results);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, movies]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (reviews.length === 0) {
    return <div>We don't have any reviews for this movie.</div>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
