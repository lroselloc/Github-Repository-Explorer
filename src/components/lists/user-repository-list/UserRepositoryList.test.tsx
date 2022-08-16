import { cleanup, render, screen, within } from "@testing-library/react";
import { Repository } from "../../../models/userRepositorySearchResponse";
import {
  mockAllIsIntersecting,
  resetIntersectionMocking,
  setupIntersectionMocking,
} from "../../../test-utils/intersection-observer-test-utils";
import formatNumber from "../../../utils/formatNumber";
import UserRepositoryList, {
  UserRepositoryListProps,
} from "./UserRepositoryList";

const repositoryLength = 100;
const repositories: Repository[] = Array.from({ length: repositoryLength }).map(
  (_, idx) => ({
    id: idx,
    name: `Repository ${idx}`,
    description: `This is the description for repository ${idx}`,
    stargazers_count: Math.round(Math.random() * 400),
  })
);
let props: UserRepositoryListProps = {
  repositories,
  getNextRepositories: () => {},
};
beforeEach(() => {
  setupIntersectionMocking(jest.fn);
});

afterEach(() => {
  resetIntersectionMocking();
  cleanup();
});

test("should render list of repositories", () => {
  render(<UserRepositoryList {...props} />);
  repositories.forEach((repository, idx) => {
    const repoContainer = screen.getByTestId(`repository-${idx}`);
    expect(
      within(repoContainer).getByText(repository.name)
    ).toBeInTheDocument();
    expect(
      within(repoContainer).getByText(repository.description)
    ).toBeInTheDocument();
    expect(
      within(repoContainer).getByText(formatNumber(repository.stargazers_count))
    ).toBeInTheDocument();
  });
});

test("should call callback function when intersection observer intersects", () => {
  const mockFn = jest.fn(() => {});
  render(<UserRepositoryList {...props} getNextRepositories={mockFn} />);
  mockAllIsIntersecting(true);
  expect(mockFn).toBeCalled();
});
