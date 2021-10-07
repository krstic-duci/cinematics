import type { MoviesItems } from "pages/Movies/Movies.types";
import { testMovie } from "utils/mockMovie";
import reducer, {
  addWatchLater,
  removeWatchLaterItem,
} from "./watchLaterSlice";

describe("WatchLater reducer", () => {
  it("should add one movie item", () => {
    const previousState: MoviesItems = { results: [] };
    const addedMovie = { ...testMovie };

    expect(reducer(previousState, addWatchLater(addedMovie))).toEqual({
      results: [addedMovie],
    });
  });

  it("should remove item by id", () => {
    const previousState: MoviesItems = {
      results: [
        {
          ...testMovie,
        },
      ],
    };
    expect(
      reducer(previousState, removeWatchLaterItem(previousState.results[0].id))
    ).toEqual({ results: [] });
  });
});
