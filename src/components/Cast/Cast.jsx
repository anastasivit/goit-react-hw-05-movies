import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesCast } from '../../services/api';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getMoviesCast(id).then(setCast);
  }, [id]);

  console.log(cast);
  return (
    <div>
      <h1>Cast</h1>

      {cast.map(element => (
        <div key={element.id}>
          <h1>{element.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Cast;
