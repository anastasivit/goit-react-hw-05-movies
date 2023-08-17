import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MoviesListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export const MovieItem = styled.li`
  margin-bottom: 16px;
`;

export const MovieLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    color: orangered;
  }
`;

export const MovieTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export default MoviesListContainer;
