import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

const App = () => {
  return (
    <Router>
      <nav>
        {/* Вкладка Home */}
        <Link to="/">Home</Link>
        {/* Вкладка Movies */}
        <Link to="/movies">Movies</Link>
      </nav>
      <Routes>
        {/* Залишаємо додатковий маршрут для головної сторінки */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        {/* Додати маршрут для головної сторінки */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
