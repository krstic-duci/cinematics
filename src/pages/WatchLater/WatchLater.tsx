import { MouseEvent, useState } from "react";

import { StarFill, Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { removeWatchLaterItem, selectWatchLaterMovies } from "app/store/watchLater/watchLaterSlice";
import InfoText from "components/InfoText";
import Section from "components/Section";
import Title from "components/Title";

import styles from "./WatchLater.module.css";

const WatchLater = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovieId, setShowSelectedMovieId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const watchLaterMovies = useAppSelector(selectWatchLaterMovies);

  const handleRemoveMovie = (id: number | null) => {
    if (!id) {
      return;
    }
    toast.success("Removed from Watch later");
    dispatch(removeWatchLaterItem(id));
    setShowDeleteModal(false);
  };

  const handleOpenModal = (id: number, event: MouseEvent) => {
    event.stopPropagation();
    setShowDeleteModal(true);
    setShowSelectedMovieId(id);
  };

  return (
    <>
      <Title label="Watch Later" />

      <Section data-testid="watchLaterSection">
        {watchLaterMovies.map(({ title, popularity, id, release_date }) => (
          <div key={id} className={`${styles.cardWatchLater} mb-3`} data-testid="watchLaterItem">
            <InfoText
              className={`${styles.cardWatchLaterTitle} mb-0 mt-2 text-center text-uppercase`}
            >
              {title}
            </InfoText>

            <div className="d-flex align-items-center flex-wrap p-3">
              <Col md={10} xs={12}>
                <InfoText
                  label="Popularity"
                  className="d-flex align-items-center"
                  labelClassName={`${styles.cardWatchPopularity} text-light p-1 me-1`}
                >
                  {popularity} <StarFill color="var(--bs-orange)" className="ms-1" />
                </InfoText>
                <InfoText
                  label="Release date"
                  labelClassName={`${styles.cardWatchReleaseDate} text-light p-1 me-1`}
                >
                  {release_date}
                </InfoText>
              </Col>

              <Col md={2} xs={12} className="mt-3 mt-md-0">
                <Button
                  variant="outline-danger"
                  onClick={(event) => handleOpenModal(id, event)}
                  className="mx-auto ms-md-auto me-md-0 d-flex align-items-center"
                  data-testid="openModalWatchLater"
                >
                  <Trash className="me-1" />
                  Remove
                </Button>
              </Col>
            </div>
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
