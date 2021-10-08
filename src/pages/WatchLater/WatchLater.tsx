import { useState } from "react";

import { ThreeDotsVertical } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { removeWatchLaterItem, selectWatchLaterMovies } from "app/store/watchLater/watchLaterSlice";
import Section from "components/Section";
import Title from "components/Title";

import styles from "./WatchLater.module.css";

const WatchLater = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovieId, setShowSelectedMovieId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const watchLaterMovies = useAppSelector(selectWatchLaterMovies);

  const handleRemoveMovie = (id: number | null) => {
    if (id) {
      dispatch(removeWatchLaterItem(id));
      return toast.success("Removed from Watch later");
    }
    setShowDeleteModal(false);
  };

  const handleOpenModal = (id: number) => {
    setShowDeleteModal(true);
    setShowSelectedMovieId(id);
  };

  return (
    <>
      <Title label="Watch Later" />

      <Section data-testid="watchLaterSection">
        {watchLaterMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`${styles.cardWatchLater} d-flex p-3 align-items-center mb-3`}
            data-testid="watchLaterItem"
          >
            <p className="mb-0">
              {index + 1}. {movie.title}
            </p>
            <Button
              variant="outline-dark"
              onClick={() => handleOpenModal(movie.id)}
              className="ms-auto"
              data-testid="openModalWatchLater"
            >
              <ThreeDotsVertical />
            </Button>
          </div>
        ))}
      </Section>

      <Modal
        centered
        onHide={() => setShowDeleteModal(false)}
        show={showDeleteModal}
        size="sm"
        data-testid="bsModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this item from "Watch Later"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleRemoveMovie(selectedMovieId)}
            variant="outline-danger"
            data-testid="bsModalDeleteButton"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WatchLater;
