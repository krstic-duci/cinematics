import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Movie } from "pages/Movies/Movies.types";

import watchLaterReducer from "app/store/watchLater/watchLaterSlice";
import { testMovie } from "utils/mockMovie";

import Card from "./Card";

describe("Card component", () => {
  describe("with initial testMovie", () => {
    beforeEach(() => {
      render(
        <Provider
          store={configureStore({ reducer: { watchLater: watchLaterReducer } })}
        >
          <Card onFavoritePickOrRemove={() => jest.fn()} movie={testMovie} />
        </Provider>
      );
    });
    it("should not have button disabled when movie isn't favorite", () => {
      expect(screen.getByRole("button", { name: /add/i })).not.toBeDisabled();
    });

    it("should have image when poster image is available", () => {
      const image = screen.getByAltText(testMovie.title);
      expect(image.getAttribute("src")).toContain(testMovie.poster_path);
    });
  });

  it("should have button disabled and card overlay present when movie is favorite", () => {
    const favoriteMovie: Movie = { ...testMovie, isFavorite: true };
    render(
      <Provider
        store={configureStore({ reducer: { watchLater: watchLaterReducer } })}
      >
        <Card onFavoritePickOrRemove={() => jest.fn()} movie={favoriteMovie} />
      </Provider>
    );
    expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
    expect(screen.getByTestId("cardImageOverlay")).toBeInTheDocument();
  });

  it("should have placeholder image when poster image is unavailable", () => {
    const placeholderMovie: Movie = { ...testMovie, poster_path: null };
    const placeholderSrc = "https://via.placeholder.com/300";
    render(
      <Provider
        store={configureStore({ reducer: { watchLater: watchLaterReducer } })}
      >
        <Card
          onFavoritePickOrRemove={() => jest.fn()}
          movie={placeholderMovie}
        />
      </Provider>
    );
    const image = screen.getByAltText(testMovie.title);
    expect(image.getAttribute("src")).toContain(placeholderSrc);
  });
});
