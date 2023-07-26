import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

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
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
