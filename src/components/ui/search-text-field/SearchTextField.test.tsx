import { fireEvent, render, screen } from "@testing-library/react";
import SearchTextField, { SearchTextFieldProps } from "./SearchTextField";

const getSearchTextFieldProps = (): SearchTextFieldProps => ({
  name: "search",
  value: "custom search",
  label: "search",
  onChange: () => {},
  errors: "",
});

let props = getSearchTextFieldProps();

beforeEach(() => {
  props = getSearchTextFieldProps();
});

test("should render label and user in text field", () => {
  render(<SearchTextField {...props} />);
  expect(screen.getByText(props.label || "")).toBeInTheDocument();
  expect(screen.getByLabelText(props.label || "")).toHaveDisplayValue(
    props.value
  );
});

test("should display errors when validation fails", () => {
  const propsWithErrors: SearchTextFieldProps = {
    ...props,
    errors: "An error",
  };
  render(<SearchTextField {...propsWithErrors} />);
  expect(screen.getByText(propsWithErrors.errors || "")).toBeInTheDocument();
  expect(screen.getByLabelText(propsWithErrors.label || "")).toHaveClass(
    "is-invalid",
    { exact: false }
  );
});

test("should do action when value is entered", () => {
  const onChangeFn = jest.fn((_: number) => {});
  const propsWithMockFn: SearchTextFieldProps = {
    ...props,
    onChange: onChangeFn,
  };
  render(<SearchTextField {...propsWithMockFn} />);
  const input = screen.getByLabelText(propsWithMockFn.label || "");
  fireEvent.change(input, { target: { value: "new user" } });
  expect(onChangeFn).toBeCalled();
});
