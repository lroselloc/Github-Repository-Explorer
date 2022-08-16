import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../../store/store";
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from "../../test-utils/intersection-observer-test-utils";
import SearchUserPage from "./SearchUserPage";
import * as userService from "../../api/userService";

let store = configureStore({
  reducer: rootReducer,
});
const userSearchString = "user";
const getUserSearchReturnedValue = () =>
  Array.from({
    length: store.getState().userSearch.numberUserPerPage,
  }).map((_, idx) => ({ id: idx, login: `${userSearchString}${idx}` }));

beforeEach(() => {
  store = configureStore({
    reducer: rootReducer,
  });
  setupIntersectionMocking(jest.fn);

  jest.spyOn(userService, "getUsers").mockResolvedValue({
    total_count: 200,
    incomplete_results: true,
    items: [...getUserSearchReturnedValue()],
  });
});

afterEach(() => {
  resetIntersectionMocking();
});

test("should render input username and button", () => {
  render(
    <Provider store={store}>
      <SearchUserPage />
    </Provider>
  );
  expect(screen.getByText("username", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("search", { exact: false })).toBeInTheDocument();
});

test("should change username input when user writes", async () => {
  const newUser = "tom";
  render(
    <Provider store={store}>
      <SearchUserPage />
    </Provider>
  );
  fireEvent.change(screen.getByLabelText("username", { exact: false }), {
    target: { value: newUser },
  });

  await waitFor(async () => {
    const input = await screen.findByLabelText("username", { exact: false });
    expect(input).toBeInTheDocument();
  });
  await waitFor(async () => {
    const input = await screen.findByLabelText("username", { exact: false });
    expect(input).toHaveValue(newUser);
  });
});

test("should display error when input goes empty and disable button", async () => {
  const newUser = "tom";
  render(
    <Provider store={store}>
      <SearchUserPage />
    </Provider>
  );
  fireEvent.change(screen.getByLabelText("username", { exact: false }), {
    target: { value: newUser },
  });
  fireEvent.change(screen.getByLabelText("username", { exact: false }), {
    target: { value: "" },
  });
  await waitFor(async () => {
    const error = await screen.findByText(/username.*required/i);
    expect(error).toBeInTheDocument();
  });

  await waitFor(async () => {
    const button = await screen.findByText(/search/i);
    expect(button).toBeDisabled();
  });

  await waitFor(async () => {
    const input = await screen.findByLabelText("username", { exact: false });
    expect(input).toBeInTheDocument();
  });
});

describe("given an user search and search button clicked", () => {
  test("should display user search string when button is clicked", async () => {
    render(
      <Provider store={store}>
        <SearchUserPage />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText("username", { exact: false }), {
      target: { value: userSearchString },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(async () => {
      const regex = new RegExp(`users.*for.*${userSearchString}`, "i");
      const searchString = await screen.findByText(regex, {
        exact: false,
      });
      expect(searchString).toBeInTheDocument();
    });

    await waitFor(async () => {
      const button = await screen.findByText(/search/i);
      expect(button).toBeDisabled();
    });

    await waitFor(async () => {
      const input = await screen.findByLabelText("username", { exact: false });
      expect(input).toBeInTheDocument();
    });
  });

  test("should display user list when user is searched", async () => {
    render(
      <Provider store={store}>
        <SearchUserPage />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText("username", { exact: false }), {
      target: { value: userSearchString },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(async () => {
      const apiReturnedValue = getUserSearchReturnedValue();
      const regex = new RegExp(
        apiReturnedValue.map((user) => `^${user.login}`).join("|"),
        "i"
      );
      const userButtons = await screen.findAllByText(regex, {
        exact: false,
      });
      expect(userButtons.length).toBe(apiReturnedValue.length);
    });

    await waitFor(async () => {
      const input = await screen.findByLabelText("username", { exact: false });
      expect(input).toBeInTheDocument();
    });
  });
});
