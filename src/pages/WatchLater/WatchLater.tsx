import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  removeWatchLaterItem,
  selectWatchLaterMovies,
} from "app/store/watchLater/watchLaterSlice";

import { removedMovie } from "./messages";

const WatchLater = () => {
  const dispatch = useAppDispatch();
  const watchLaterMovies = useAppSelector(selectWatchLaterMovies);

  const handleRemoveMovie = (id: number) => {
    dispatch(removeWatchLaterItem(id));
    // TODO: not working ?!
    toast.success(removedMovie);
  };

  return (
    <div>
      <p>Watch later</p>
      {/* TODO: Styling */}
      <section>
        {watchLaterMovies.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
            <p>{movie.vote_average}</p>
            <Button
              variant="danger"
              onClick={() => handleRemoveMovie(movie.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default WatchLater;
