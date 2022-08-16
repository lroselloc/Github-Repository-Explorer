import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import Paginator, {
  PaginatorProps,
  PAGINATOR_TEST_ID_FIRST,
  PAGINATOR_TEST_ID_LAST,
  PAGINATOR_TEST_ID_NEXT,
  PAGINATOR_TEST_ID_PREVIOUS,
} from "./Paginator";

let props: PaginatorProps = {
  currentPage: 20,
  totalCount: 1000,
  pagesToIndex: 100,
  onClick: (_: number) => null,
  elementsPerPage: 10,
};

beforeEach(() => {
  props = {
    currentPage: 1,
    totalCount: 1000,
    pagesToIndex: 100,
    onClick: (_: number) => null,
    elementsPerPage: 10,
  };
});

afterEach(() => cleanup());

test("should render paginator with 100 pages to index", () => {
  render(<Paginator {...props} />);
  var regex = new RegExp(
    Array.from({ length: props.pagesToIndex })
      .map((_, idx) => `${props.pagesToIndex - idx}`)
      .join("|")
  );

  const buttonPages = screen.getAllByText(regex);

  expect(buttonPages.length).toBe(props.pagesToIndex);
});

test("should render paginator with active page at 7", () => {
  const currentPage = 7;
  render(<Paginator {...props} currentPage={currentPage} />);
  const activePageButton = screen
    .getAllByRole("listitem")
    .find((pageButton) => {
      try {
        within(pageButton).getByText(currentPage.toString());
        return true;
      } catch (e) {
        return false;
      }
    });
  expect(activePageButton).toHaveClass("active");
});

test("should not render first button when current page is 1", () => {
  render(<Paginator {...props} />);
  expect(() => screen.getByTestId(PAGINATOR_TEST_ID_FIRST)).toThrow();
});

test("should not render previous button when current page is 1", () => {
  render(<Paginator {...props} />);
  expect(() => screen.getByTestId(PAGINATOR_TEST_ID_PREVIOUS)).toThrow();
});

test("should not render next button when current page is last", () => {
  let numberPages = Math.floor(props.totalCount / props.elementsPerPage);
  numberPages = !(props.totalCount % props.elementsPerPage)
    ? numberPages
    : numberPages + 1;
  render(<Paginator {...props} currentPage={numberPages} />);
  expect(() => screen.getByTestId(PAGINATOR_TEST_ID_NEXT)).toThrow();
});

test("should not render last button when current page is last", () => {
  let numberPages = Math.floor(props.totalCount / props.elementsPerPage);
  numberPages = !(props.totalCount % props.elementsPerPage)
    ? numberPages
    : numberPages + 1;
  render(<Paginator {...props} currentPage={numberPages} />);
  expect(() => screen.getByTestId(PAGINATOR_TEST_ID_LAST)).toThrow();
});

test("should render only pages from 41 to 50", () => {
  const currentPage = 45;
  const pagesToIndex = 10;
  const pages = new RegExp([41, 42, 43, 44, 45, 46, 47, 48, 49, 50].join("|"));
  render(
    <Paginator
      {...props}
      currentPage={currentPage}
      pagesToIndex={pagesToIndex}
    />
  );
  const pagesButton = screen.getAllByText(pages);
  expect(pagesButton.length).toBe(props.elementsPerPage);
  expect(() => screen.getByText(20)).toThrow();
});

test("should call function when clicked", () => {
  const onClickFn = jest.fn((_: number) => {});
  render(<Paginator {...props} onClick={onClickFn} />);
  const page = screen.getByText(props.currentPage);
  fireEvent.click(page);
  expect(onClickFn).toBeCalledWith(props.currentPage);
});
