import UserList, { UserListProps } from "./UserList";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from "../../../test-utils/intersection-observer-test-utils";

const userListProps: UserListProps = {
  activeUser: "",
  setActiveUser: (login: string) => {},
  users: [
    { login: "user1", id: 1 },
    { login: "user2", id: 2 },
    { login: "user3", id: 3 },
    { login: "user4", id: 4 },
  ],
  usersRepositories: {
    user1: {
      totalCount: 200,
      currentPage: 1,
      repositories: Array.from({ length: 200 }).map((_, idx) => ({
        id: idx,
        name: `Repository user 1 ${idx}`,
        description: `This is the description for repository ${idx}`,
        stargazers_count: Math.round(Math.random() * 400),
      })),
    },
    user2: {
      totalCount: 45,
      currentPage: 1,
      repositories: Array.from({ length: 45 }).map((_, idx) => ({
        id: idx,
        name: `Repository user 2 ${idx}`,
        description: `This is the description for repository ${idx}`,
        stargazers_count: Math.round(Math.random() * 400),
      })),
    },
    user3: {
      totalCount: 65,
      currentPage: 1,
      repositories: Array.from({ length: 65 }).map((_, idx) => ({
        id: idx,
        name: `Repository user 3 ${idx}`,
        description: `This is the description for repository ${idx}`,
        stargazers_count: Math.round(Math.random() * 400),
      })),
    },
    user4: {
      totalCount: 0,
      currentPage: 1,
      repositories: [],
    },
  },
  getUserRepositories: () => {},
  getNextUserRepositores: () => {},
};

beforeEach(() => {
  setupIntersectionMocking(jest.fn);
});

afterEach(() => {
  resetIntersectionMocking();
  cleanup();
});

test("should render list of users with no visible repositories", () => {
  render(<UserList {...userListProps} />);
  const userButtons = screen.getAllByText(/^user\d/);
  expect(userButtons.length).toBe(userListProps.users.length);
  screen
    .queryAllByText(/Repository/)
    .forEach((element) => expect(element).not.toBeVisible());
});

test("should render visible only user1's repositories when active user is user 1", () => {
  render(<UserList {...userListProps} activeUser="user1" />);
  screen.getAllByText(/Repository user 1/).forEach((element) => {
    expect(element).toBeVisible();
  });
  screen.getAllByText(/Repository user 2/).forEach((element) => {
    expect(element).not.toBeVisible();
  });
  screen.getAllByText(/Repository user 3/).forEach((element) => {
    expect(element).not.toBeVisible();
  });
});

test("should call callback function when an user is selected", () => {
  const mockFn = jest.fn(() => {});
  render(<UserList {...userListProps} getUserRepositories={mockFn} />);
  fireEvent.click(screen.getByText("user2"));
  expect(mockFn).toBeCalled();
});

test("should render 'No repositories were found for user4' when active user is user4", () => {
  render(<UserList {...userListProps} activeUser="user4" />);
  expect(
    screen.getByText("No repositories were found for user4")
  ).toBeVisible();
});
