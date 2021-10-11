import { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Swiper, { Navigation, Keyboard } from "swiper";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { useDebounce } from "use-debounce";

import { apiKey, apiMovieUrl } from "api";
import Card from "components/Card";
import Section from "components/Section";
import Title from "components/Title";

import { swiperOptions } from "./Movies.constants";

import type { Movie, MoviesItems, MoviesResponse } from "./Movies.types";

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

  const handleMovieSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClearMovieSearch = () => {
    setQuery("");
  };

  const onFavoritePickOrRemove = (id: number) => {
    let favMovies: Movie[] = [];

    // TODO: try to avoid too much nesting
    if (movies) {
      favMovies = movies.results.map((movie) => {
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
        const response: MoviesResponse = await (
          await fetch(
            `${apiMovieUrl}/search/movie?api_key=${apiKey}&include_adult=false&query=${debouncedQuery}`
          )
        ).json();
        setMovies({ results: response.results });
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
      <Title label="Cinematics" />

      <Form onSubmit={(event) => event.preventDefault()}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Start typing..."
            onChange={handleMovieSearch}
            value={query}
          />
          <Button onClick={handleClearMovieSearch} variant="outline-dark">
            Clear
          </Button>
        </InputGroup>
      </Form>

      {loading && query.length > 1 && (
        <div className="text-center w-100 mt-2" data-testid="spinner">
          <Spinner animation="border" />
        </div>
      )}

      <Section>
        <SwiperContainer {...swiperOptions}>
          {movies && movies?.results?.length > 0
            ? movies.results.map((movie) => (
                <SwiperSlide key={movie.id} data-testid="movieCards">
                  <Card movie={movie} onFavoritePickOrRemove={onFavoritePickOrRemove} />
                </SwiperSlide>
              ))
            : null}
        </SwiperContainer>

        {movies?.results?.length === 0 && query.length > 1 && (
          <Alert variant="info" className="text-center" data-testid="noItems">
            There are no movies for searched value, please try something else...
          </Alert>
        )}
      </Section>

      {error && (
        <Alert variant="danger">
          There was some problem while fetching the movies, please try again later...
        </Alert>
      )}
    </>
  );
};

export default MoviesLists;
