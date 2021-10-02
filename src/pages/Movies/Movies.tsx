import { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useDebounce } from "use-debounce";

import Item from "components/Item";
import SearchField from "components/SearchField";

import { apiKey, apiMovieSearchUrl } from "utils/constants";

import { noMoviesItems, cannotFetchMovies } from "./messages";

export interface Movie {
  poster_path: string | null;
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

export interface MoviesItems {
  results: Movie[];
}

const MoviesLists = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MoviesItems | null>(null);

  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    // Early exit when search query is falsy.
    // This way we won't call API when query is empty string,
    // and we will leave previously searched movies
    // when "Clear" is clicked
    if (!debouncedQuery) {
      return;
    }
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await (
          await fetch(
            `${apiMovieSearchUrl}?api_key=${apiKey}&include_adult=false&query=${debouncedQuery}`
          )
        ).json();
        setMovies(response);
        setLoading(false);
      } catch {
        setLoading(false);
        if (debouncedQuery.length > 1) {
          <Alert>{cannotFetchMovies}</Alert>;
        }
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <>
      <SearchField query={query} setQuery={setQuery} />

      {loading && query.length > 1 && (
        <div className="text-center w-100 mt-2">
          <Spinner animation="border" />
        </div>
      )}

      <section className="my-4">
        {movies && movies?.results?.length > 0
          ? movies.results.map((movie) => <Item key={movie.id} movie={movie} />)
          : null}

        {movies?.results?.length === 0 && query.length > 1 && (
          <div className="w-100 text-center">{noMoviesItems}</div>
        )}
      </section>
    </>
  );
};

export default MoviesLists;
