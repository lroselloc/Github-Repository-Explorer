import { render, screen } from "@testing-library/react";
import formatNumber from "../../../utils/formatNumber";
import RepositoryCard, { RepositoryCardProps } from "./RepositoryCard";

let props: RepositoryCardProps = {
  repository: {
    id: 1,
    name: "Test Repository",
    stargazers_count: 1000,
    description: "This is a test repository",
  },
};

beforeEach(() => {
  props = {
    repository: {
      id: 1,
      name: "Test Repository",
      stargazers_count: 1000,
      description: "This is a test repository",
    },
  };
});

test("should render with repository information", () => {
  render(<RepositoryCard {...props} />);
  const repoName = screen.getByText(props.repository.name);
  const repoDescription = screen.getByText(props.repository.description);
  const stars = screen.getByText(
    formatNumber(props.repository.stargazers_count)
  );
  expect(repoName).toBeInTheDocument();
  expect(repoDescription).toBeInTheDocument();
  expect(stars).toBeInTheDocument();
});
