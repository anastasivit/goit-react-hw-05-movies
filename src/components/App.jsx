import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppWrapper } from './App.styled';
// import { Navigation } from './Navigation/Navigation';
import { SharedLayout } from './SharedLayout/SharedLayout';

const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const Home = lazy(() => import('pages/Home/Home'));

export const App = () => {
  return (
    <AppWrapper>
      {/* <Navigation /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />

            <Route path="movies/:id" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AppWrapper>
  );
};
