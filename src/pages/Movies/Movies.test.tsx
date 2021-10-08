import { configureStore } from "@reduxjs/toolkit";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";

import watchLaterReducer from "app/store/watchLater/watchLaterSlice";

import Movies from "./Movies";

import type { MoviesItems } from "./Movies.types";

const inputTestValue = "testValue";

const testMovies: MoviesItems = {
  results: [
    {
      adult: false,
      backdrop_path: "/test2.jpg",
      genre_ids: [2],
      id: 2,
      original_language: "en",
      original_title: "title2",
      overview: "overview2",
      popularity: 2,
      poster_path: "/test2.jpeg",
      release_date: "2021-07-02",
      title: "title2",
      video: false,
      vote_average: 2,
      vote_count: 2,
      isFavorite: false,
    },
    {
      adult: false,
      backdrop_path: "/test3.jpg",
      genre_ids: [3],
      id: 3,
      original_language: "en",
      original_title: "title3",
      overview: "overview3",
      popularity: 3,
      poster_path: "/test3.jpeg",
      release_date: "2021-07-02",
      title: "title3",
      video: false,
      vote_average: 3,
      vote_count: 3,
      isFavorite: false,
    },
  ],
};

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Movies component", () => {
  beforeEach(() => {
    render(<Movies />);
  });

  it("should have empty initial input query value", () => {
    expect(screen.getByPlaceholderText(/start/i)).toHaveValue("");
  });

  it("should have input test value", () => {
    userEvent.type(screen.getByPlaceholderText(/start/i), inputTestValue);

    expect(screen.getByPlaceholderText(/start/i)).toHaveValue(inputTestValue);
  });

  it("should have clear the input value by clicking Clear button", () => {
    userEvent.type(screen.getByPlaceholderText(/start/i), inputTestValue);

    expect(screen.getByPlaceholderText(/start/i)).toHaveValue(inputTestValue);

    userEvent.click(screen.getByRole("button", { name: /clear/i }));

    expect(screen.getByPlaceholderText(/start/i)).toHaveValue("");
  });
});

describe("Movie component API calls", () => {
  describe("without Provider", () => {
    beforeEach(() => {
      act(() => {
        render(<Movies />);
      });
    });
    it("should have Spinner component when searching", async () => {
      expect(screen.queryByTestId("spinner")).toBeNull();

      fetchMock.mockResponseOnce(JSON.stringify({ results: [] }), {
        status: 200,
      });

      userEvent.type(screen.getByPlaceholderText(/start/i), inputTestValue);

      await waitFor(() => {
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
      });
    });

    it("should show error alert when API throws error", async () => {
      fetchMock.mockRejectOnce(() => Promise.reject("fake error message"));

      expect(screen.queryByRole("alert")).toBeNull();

      userEvent.type(screen.getByPlaceholderText(/start/i), inputTestValue);

      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
      });
    });

    it("should return no movies for query search param", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ results: [] }), {
        status: 200,
      });

      userEvent.type(screen.getByPlaceholderText(/start/i), inputTestValue);

      await waitFor(() => {
        expect(screen.getByTestId("noItems")).toBeInTheDocument();
      });
    });
  });

  it("should show movies results when API is called successfully", async () => {
    act(() => {
      render(
        <Provider store={configureStore({ reducer: { watchLater: watchLaterReducer } })}>
          <Movies />
        </Provider>
      );
    });

    fetchMock.mockResponseOnce(JSON.stringify({ results: testMovies.results }), {
      status: 200,
    });

    userEvent.type(screen.getByPlaceholderText(/start/i), inputTestValue);

    await waitFor(() => {
      expect(screen.getAllByTestId("movieCards")).toHaveLength(2);
    });
  });
});

// This file could be moved into Movies.integration.test.tsx
describe("Movie component with Child", () => {
  it("should update fav array with first item from response; show image overlay and it's button to be disabled", async () => {
    render(
      <Provider store={configureStore({ reducer: { watchLater: watchLaterReducer } })}>
        <Movies />
      </Provider>
    );

    fetchMock.mockResponseOnce(JSON.stringify({ results: testMovies.results }), {
      status: 200,
    });

    userEvent.type(screen.getByPlaceholderText(/start/i), inputTestValue);
    await waitFor(() => {
      expect(screen.getAllByTestId("movieCards")).toHaveLength(2);
    });
    userEvent.click(screen.getAllByRole("button", { name: /Add to Favorite/i })[0]);

    expect(await screen.findAllByTestId("cardImageOverlay")).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /Add to Favorite/i })[0]).toBeDisabled();
  });
});
