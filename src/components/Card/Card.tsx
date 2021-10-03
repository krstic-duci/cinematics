import React from "react";

import Button from "react-bootstrap/Button";
import { ClockHistory, Star } from "react-bootstrap-icons";

import { imgUrl } from "utils/constants";

import type { Movie } from "pages/Movies/Movies.types";

import styles from "./Card.module.css";

interface CardProps {
  movie: Movie;
}

const Card: React.VFC<CardProps> = ({ movie: { title, poster_path } }) => {
  const bgImage = poster_path
    ? `url(${imgUrl}/${poster_path})`
    : "url(https://via.placeholder.com/300)";

  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.cardImageContainer}
        style={{
          backgroundImage: bgImage,
        }}
      />

      <div
        className={`${styles.cardInfo} d-flex justify-content-center w-100 flex-wrap`}
      >
        <p
          className={`${styles.cardTitle} p-1 align-self-center text-center w-100`}
        >
          {title}
        </p>

        <div className="mb-1 mt-auto">
          <Button onClick={() => console.log("Added to favorite")}>
            Add to favorite <Star />
          </Button>

          <Button
            onClick={() => console.log("Added to Watch later")}
            className="ms-3"
          >
            Later <ClockHistory />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
