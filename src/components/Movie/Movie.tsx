import React from "react";

import { IMovie } from "components/MoviesLists";

interface MovieProps {
  movie: IMovie;
}

const Movie: React.VFC<MovieProps> = ({ movie: { title, vote_average } }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{vote_average}</p>
    </div>
  );
};

export default Movie;
