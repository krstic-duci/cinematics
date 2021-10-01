import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Movie } from "components/Movies";
import { imgUrl } from "utils/constants";

import styles from "./Item.module.css";

interface MovieProps {
  movie: Movie;
}

const Item: React.VFC<MovieProps> = ({ movie: { title, poster_path } }) => (
  <Col lg={4} md={6}>
    <div
      className={`h-100 text-center d-flex align-items-center justify-content-center ${styles.itemContainer}`}
    >
      <Row className="justify-content-center">
        <Col>
          {poster_path ? (
            <img
              src={`${imgUrl}/${poster_path}`}
              alt={title}
              className="img-fluid"
            />
          ) : (
            <p className="text-center">No image preview</p>
          )}
          <p className={`pt-2 text-center ${styles.movieTitle}`}>
            Title: {title}
          </p>
        </Col>
      </Row>
    </div>
  </Col>
);

export default Item;
