import { cleanup, render, screen } from "@testing-library/react";
import LoadingOverlay, { LOADING_OVERLAY_TEST_ID } from "./LoadingOverlay";
import { Provider } from "react-redux";
import { pushLoading } from "../../../slices/loading";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../../store/store";

let store = configureStore({
  reducer: rootReducer,
});

beforeEach(() => {
  store = configureStore({
    reducer: rootReducer,
  });
});

afterEach(() => cleanup());

test("should render Loading Overlay component with non-loading class", () => {
  render(
    <Provider store={store}>
      <LoadingOverlay />
    </Provider>
  );
  const loadingOverlay = screen.getByTestId(LOADING_OVERLAY_TEST_ID);
  expect(loadingOverlay).toBeInTheDocument();
  expect(loadingOverlay).toHaveClass("non-loading");
});

test("should change class when loading state is pushed", () => {
  store.dispatch(pushLoading());
  render(
    <Provider store={store}>
      <LoadingOverlay />
    </Provider>
  );
  const loadingOverlay = screen.getByTestId(LOADING_OVERLAY_TEST_ID);
  expect(loadingOverlay).toHaveClass("loading");
});

test("should change class when loading state is pushed several times", () => {
  store.dispatch(pushLoading());
  store.dispatch(pushLoading());
  render(
    <Provider store={store}>
      <LoadingOverlay />
    </Provider>
  );
  const loadingOverlay = screen.getByTestId(LOADING_OVERLAY_TEST_ID);
  expect(loadingOverlay).toHaveClass("loading");
});
