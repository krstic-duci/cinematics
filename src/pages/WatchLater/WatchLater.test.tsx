import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import watchLaterReducer from "app/store/watchLater/watchLaterSlice";
import { testMovie } from "utils/mockMovie";

import WatchLater from "./WatchLater";

describe("WatchLater component", () => {
  describe("with test movie", () => {
    beforeEach(() => {
      render(
        <Provider
          store={configureStore({
            reducer: { watchLater: watchLaterReducer },
            preloadedState: { watchLater: { results: [{ ...testMovie }] } },
          })}
        >
          <WatchLater />
        </Provider>
      );
    });

    it("should print 1 item when store has only 1 item", () => {
      expect(screen.getAllByTestId("watchLaterItem")).toHaveLength(1);
    });

    it("should open modal when button Remove is clicked", async () => {
      userEvent.click(screen.getByTestId("openModalWatchLater"));

      await waitFor(() => {
        expect(screen.getByTestId("bsModal")).toBeInTheDocument();
      });
    });
  });

  it("should print empty list when store is empty for watch later", () => {
    render(
      <Provider
        store={configureStore({
          reducer: { watchLater: watchLaterReducer },
          preloadedState: { watchLater: { results: [] } },
        })}
      >
        <WatchLater />
      </Provider>
    );
    expect(screen.getByTestId("watchLaterSection")).toBeEmptyDOMElement();
  });

  it("should close modal and remove item from watch later", async () => {
    const { rerender } = render(
      <Provider
        store={configureStore({
          reducer: { watchLater: watchLaterReducer },
          preloadedState: { watchLater: { results: [{ ...testMovie }] } },
        })}
      >
        <WatchLater />
      </Provider>
    );
    userEvent.click(screen.getByTestId("openModalWatchLater"));

    await waitFor(() => {
      expect(screen.getByTestId("bsModal")).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId("bsModalDeleteButton"));

    await waitForElementToBeRemoved(() => screen.queryByTestId("bsModal"));

    rerender(
      <Provider
        store={configureStore({
          reducer: { watchLater: watchLaterReducer },
          preloadedState: { watchLater: { results: [] } },
        })}
      >
        <WatchLater />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.queryByTestId("watchLaterSection")).toBeEmptyDOMElement();
    });
  });
});
