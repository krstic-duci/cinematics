import { useEffect, useState } from "react";

import Swiper, { Navigation, Keyboard } from "swiper";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useDebounce } from "use-debounce";

import { apiKey, apiMovieSearchUrl } from "api";
import Card from "components/Card";
import SearchField from "components/SearchField";

import { noMoviesItems, cannotFetchMovies } from "./messages";
import { swiperOptions } from "./Movies.constants";
import { Movie, MoviesItems } from "./Movies.types";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

Swiper.use([Navigation, Keyboard]);
new Swiper(".custom-swiper", swiperOptions);

const MoviesLists = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState<MoviesItems | null>(null);

  const [debouncedQuery] = useDebounce(query, 300);

  const onFavoritePickOrRemove = (id: number) => {
    let favMovies: Movie[] = [];

    // TODO: try to avoid too much nesting
    if (movies) {
      favMovies = movies?.results.map((movie) => {
        if (movie.id === id) {
          if (movie.isFavorite) {
            movie.isFavorite = false;
          } else {
            movie.isFavorite = true;
          }
        }
        return movie;
      });
    }

    setMovies({ results: favMovies });
  };

  useEffect(() => {
    // Early exit when search query is falsy.
    // This way we won't call API when query is empty string,
    // and we will leave previously searched movies
    // when "Clear" is clicked
    if (!debouncedQuery) {
      return;
    }
    setLoading(true);
    setError(false);

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
        setError(true);
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
        <SwiperContainer {...swiperOptions}>
          {movies && movies?.results?.length > 0
            ? movies.results.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Card
                    movie={movie}
                    onFavoritePickOrRemove={onFavoritePickOrRemove}
                  />
                </SwiperSlide>
              ))
            : null}
        </SwiperContainer>

        {movies?.results?.length === 0 && query.length > 1 && (
          <Alert variant="info" className="text-center">
            {noMoviesItems}
          </Alert>
        )}
      </section>

      {error && <Alert variant="danger">{cannotFetchMovies}</Alert>}
    </>
  );
};

export default MoviesLists;
