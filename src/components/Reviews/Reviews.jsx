import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesReviews } from '../../services/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getMoviesReviews(id).then(setReviews);
  }, [id]);

  console.log(reviews);
  return (
    <div>
      <h1>Reviews</h1>

      {reviews.map(element => (
        <div key={element.id}>
          <p>Author: {element.author}</p>
          <p>{element.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
