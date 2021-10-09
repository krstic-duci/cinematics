import { configureStore } from "@reduxjs/toolkit";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";

import watchLaterReducer from "app/store/watchLater/watchLaterSlice";
import { testMovies } from "utils/mockMovie";

import Movies from "./Movies";

const inputTestValue = "testValue";

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
