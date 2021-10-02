import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "react-bootstrap/Button";
import { ClockHistory, Star } from "react-bootstrap-icons";

import { Movie } from "pages/Movies";
import { imgUrl } from "utils/constants";

import styles from "./Item.module.css";

import "react-lazy-load-image-component/src/effects/blur.css";

interface MovieProps {
  movie: Movie;
}

const Item: React.VFC<MovieProps> = ({ movie: { title, poster_path } }) => (
  <div className="m-3 text-center">
    {poster_path ? (
      <LazyLoadImage
        effect="blur"
        src={`${imgUrl}/${poster_path}`}
        alt={title}
        className="img-fluid"
      />
    ) : (
      <p className="text-center text-black-50">No image preview</p>
    )}
    <p className={`pt-2 text-center ${styles.movieTitle}`}>{title}</p>
    <div className="d-flex flex-column">
      <Button onClick={() => console.log("Added to favorite")}>
        Add to favorite <Star />
      </Button>
      <Button
        onClick={() => console.log("Added to Watch later")}
        className="mt-2"
      >
        Later <ClockHistory />
      </Button>
    </div>
  </div>
);

export default Item;
