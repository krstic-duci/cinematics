import React from "react";

import Button from "react-bootstrap/Button";
import { ClockHistory, Star } from "react-bootstrap-icons";

import { Movie } from "pages/Movies";
import { imgUrl } from "utils/constants";

import styles from "./Item.module.css";

interface MovieProps {
  movie: Movie;
}

const Item: React.VFC<MovieProps> = ({ movie: { title, poster_path } }) => {
  const bgImage = poster_path
    ? `url(${imgUrl}/${poster_path})`
    : "url(https://via.placeholder.com/300)";

  return (
    <div className={`${styles.itemContainer} mx-3 h-100`}>
      <div
        className={styles.bgImageContainer}
        style={{
          backgroundImage: bgImage,
        }}
      />
      {/* {poster_path ? (
      <LazyLoadImage
        effect="blur"
        src={`${imgUrl}/${poster_path}`}
        alt={title}
        threshold={50}
        width="200px"
        height="300px"
      />
    ) : (
      <img src="https://via.placeholder.com/200x300" alt="placeholder" />
    )} */}

      <div
        className={`${styles.movieInfo} d-flex justify-content-center w-100 flex-wrap`}
      >
        <p
          className={`${styles.movieTitle} pt-2 align-self-center text-center w-100`}
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

export default Item;
