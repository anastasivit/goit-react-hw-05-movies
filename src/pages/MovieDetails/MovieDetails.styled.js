import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  width: 50px;
  &.active {
    color: white;
    background-color: orangered;
  }
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  margin-bottom: 16px;
  align-self: flex-start;
  :hover {
    color: white;
    background-color: orangered;
  }
`;

export const Poster = styled.img`
  max-width: 200px;
  margin-right: 16px;
`;

export const InfoContainer = styled.div`
  display: flex;
`;

export const Details = styled.div`
  flex-grow: 1;
  margin-bottom: 24px;
  h2 {
    margin-bottom: 8px;
    font-size: 24px;
  }
  p {
    margin-bottom: 8px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 4px;
  }
`;

export const CastReviewsContainer = styled.div`
  display: flex;
  margin-top: 16px;
  ${Link} {
    margin-right: 16px;
  }
`;
