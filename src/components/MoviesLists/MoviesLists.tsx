import React, { useEffect, useState } from "react";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import Movie from "components/Movie";

import { apiKey, apiUrl } from "utils/constants";

export interface IMovie {
  poster: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface IMovies {
  results: IMovie[];
}

const MoviesLists = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<IMovies | null>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (
          await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        ).json();
        setMovies(response);
      } catch (error) {
        console.error(error);
      }
    };
    query.length > 3 && fetchData();
  }, [query]);

  return (
    <>
      <form>
        <InputGroup>
          <FormControl
            placeholder="Search you movie here"
            onChange={onInputChange}
            aria-describedby="searchBox"
          />
          <p id="searchBox" className="form-text">
            Start typing
          </p>
        </InputGroup>
        {query ? query : "empty"}
      </form>

      {movies && movies.results.length > 0
        ? movies.results.map((movie) => <Movie key={movie.id} movie={movie} />)
        : "No movies, please start searching..."}
    </>
  );
};

export default MoviesLists;
