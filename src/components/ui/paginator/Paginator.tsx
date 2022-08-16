import { Pagination } from "react-bootstrap";

export const PAGINATOR_TEST_ID = "paginator";
export const PAGINATOR_TEST_ID_FIRST = `${PAGINATOR_TEST_ID}-first`;
export const PAGINATOR_TEST_ID_PREVIOUS = `${PAGINATOR_TEST_ID}-previous`;
export const PAGINATOR_TEST_ID_LAST = `${PAGINATOR_TEST_ID}-last`;
export const PAGINATOR_TEST_ID_NEXT = `${PAGINATOR_TEST_ID}-next`;
export const getPaginatorTestId = (page: number) =>
  `${PAGINATOR_TEST_ID}-${page}`;
export interface PaginatorProps {
  currentPage: number;
  totalCount: number;
  pagesToIndex: number;
  onClick: (page: number) => any;
  elementsPerPage: number;
}

const Paginator = ({
  currentPage,
  totalCount,
  pagesToIndex,
  onClick,
  elementsPerPage,
}: PaginatorProps) => {
  let numberPages = 0;
  numberPages = Math.floor(totalCount / elementsPerPage);
  numberPages = !(totalCount % elementsPerPage) ? numberPages : numberPages + 1;

  const pageArray: number[] = [];
  let numberPagesBefore = Math.floor((pagesToIndex - 1) / 2);
  numberPagesBefore =
    numberPages - currentPage < numberPagesBefore
      ? pagesToIndex - (numberPages - currentPage) - 1
      : numberPagesBefore;

  for (let i = currentPage - numberPagesBefore; i < currentPage; i++) {
    if (i > 0) pageArray.push(i);
  }
  pageArray.push(currentPage);
  for (
    let i = currentPage + 1;
    pageArray.length < pagesToIndex && i <= numberPages;
    i++
  ) {
    pageArray.push(i);
  }

  return (
    <Pagination data-testid={PAGINATOR_TEST_ID}>
      {pageArray.indexOf(1) < 0 && (
        <Pagination.First
          onClick={() => onClick(1)}
          data-testid={PAGINATOR_TEST_ID_FIRST}
        />
      )}
      {currentPage !== 1 && (
        <Pagination.Prev
          onClick={() => onClick(currentPage - 1)}
          data-testid={PAGINATOR_TEST_ID_PREVIOUS}
        />
      )}
      {pageArray.map((page) => (
        <Pagination.Item
          active={currentPage === page}
          onClick={() => onClick(page)}
          key={page}
          data-testid={getPaginatorTestId(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      {currentPage !== numberPages && (
        <Pagination.Next
          onClick={() => onClick(currentPage + 1)}
          data-testid={PAGINATOR_TEST_ID_NEXT}
        />
      )}
      {pageArray.indexOf(numberPages) < 0 && (
        <Pagination.Last
          onClick={() => onClick(numberPages)}
          data-testid={PAGINATOR_TEST_ID_LAST}
        />
      )}
    </Pagination>
  );
};

export default Paginator;
