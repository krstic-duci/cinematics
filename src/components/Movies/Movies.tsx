import { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

import Item from "components/Movies/Item";
import SearchField from "components/SearchField";

import { apiKey, apiMovieSearchUrl } from "utils/constants";
import { cannotFetchMovies } from "utils/toastMessages";

import { noMoviesItems } from "./messages";

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

const preventToastDuplicateError = "prevent_toast_duplicate_error";

const MoviesLists = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MoviesItems | null>(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await (
          await fetch(`${apiMovieSearchUrl}?api_key=${apiKey}&query=${query}`)
        ).json();
        setMovies(response);
        setLoading(false);
      } catch {
        setLoading(false);
        if (query.length > 1) {
          toast.error(cannotFetchMovies, {
            position: toast.POSITION.BOTTOM_LEFT,
            toastId: preventToastDuplicateError,
          });
        }
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <SearchField query={query} setQuery={setQuery} />

      {loading && query.length > 1 && (
        <div className="text-center w-100 mt-2">
          <Spinner animation="border" />
        </div>
      )}

      <section className="my-4 position-relative">
        <Row className="g-3">
          {movies && movies?.results?.length > 0
            ? movies.results.map((movie) => (
                <Item key={movie.id} movie={movie} />
              ))
            : null}
        </Row>

        {movies?.results?.length === 0 && query.length > 1 && (
          <div className="w-100 text-center">{noMoviesItems}</div>
        )}
      </section>
    </>
  );
};

export default MoviesLists;
