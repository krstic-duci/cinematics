import React from "react";

import { ClockHistory, Heart, HeartFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";

import { imgUrl } from "api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { addWatchLater, selectWatchLaterMovies } from "app/store/watchLater/watchLaterSlice";

import { preventDuplicateToastMovieId } from "./Card.constants";

import type { Movie } from "pages/Movies/Movies.types";

import styles from "./Card.module.css";

import "react-lazy-load-image-component/src/effects/blur.css";

interface CardProps {
  movie: Movie;
  onFavoritePickOrRemove: (id: number) => void;
}

const Card: React.VFC<CardProps> = ({ movie, onFavoritePickOrRemove }) => {
  const { title, poster_path, id, isFavorite } = movie;
  const dispatch = useAppDispatch();
  const watchLaterMovies = useAppSelector(selectWatchLaterMovies);

  const handleFavorite = () => {
    onFavoritePickOrRemove(id);
  };

  const handleWatchLaterMovie = () => {
    const isWatchLaterMovie = watchLaterMovies.find((m) => m.id === movie.id);
    if (isWatchLaterMovie) {
      return toast.warning("We already have that title for you...", {
        toastId: preventDuplicateToastMovieId,
      });
    }

    dispatch(addWatchLater(movie));
    toast.success("Added to watch later");
  };

  return (
    <>
      <div className={`${styles.cardContainer} h-100 position-relative`}>
        {isFavorite && (
          <div
            className={styles.cardImageContainerOverlay}
            onClick={handleFavorite}
            data-testid="cardImageOverlay"
          >
            <p className="text-light ms-2 w-75 mt-2">Click to remove favorite</p>
            <HeartFill color="var(--bs-red)" />
          </div>
        )}

        <LazyLoadImage
          alt={title}
          className={styles.cardImageContainer}
          effect="blur"
          height="300px"
          src={poster_path ? `${imgUrl}/${poster_path}` : "https://via.placeholder.com/300"}
          width="100%"
        />

        <div className={`${styles.cardInfo} d-flex justify-content-center w-100 flex-wrap`}>
          <p className={`${styles.cardTitle} p-1 align-self-center text-center w-100`}>{title}</p>

          <div className="mb-1 mt-auto d-flex flex-grow-1 justify-content-evenly">
            <Button
              onClick={handleFavorite}
              className="d-flex align-items-center"
              variant="primary"
              disabled={isFavorite}
            >
              Add to favorite <Heart className="ms-1" />
            </Button>

            <Button
              onClick={handleWatchLaterMovie}
              className="d-flex align-items-center"
              variant="outline-dark"
            >
              Later <ClockHistory className="ms-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
