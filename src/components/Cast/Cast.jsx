import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            params: {
              api_key: 'a671f7524d97836b3853115348c4c13a',
            },
          }
        );
        setCast(response.data.cast);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cast:', error);
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (cast.length === 0) {
    return <div>We don't have any cast for this movie.</div>;
  }

  return (
    <div className={styles.castContainer}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.actorName}>
            {actor.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
