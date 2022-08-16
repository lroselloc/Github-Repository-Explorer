import { fireEvent, render, screen } from "@testing-library/react";
import SearchButton from "./SearchButton";
import { Form } from "react-bootstrap";

test("should render search button with search text", () => {
  render(<SearchButton buttonTitle="search" disabled={false} />);
  expect(screen.getByText("search")).toBeInTheDocument();
});

test("should submit when clicked", () => {
  const mockFn = jest.fn(() => {});
  render(
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        mockFn();
      }}
    >
      <SearchButton buttonTitle="search" disabled={false} />
    </Form>
  );
  const button = screen.getByText("search");
  fireEvent.click(button);
  expect(mockFn).toBeCalled();
});

test("should not submit when clicked and disabled", () => {
  const mockFn = jest.fn(() => {});
  render(
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        mockFn();
      }}
    >
      <SearchButton buttonTitle="search" disabled={true} />
    </Form>
  );
  const button = screen.getByText("search");
  fireEvent.click(button);
  expect(mockFn).toBeCalledTimes(0);
});
