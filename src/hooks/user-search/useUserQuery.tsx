import { useCallback } from "react";
import { useSelector } from "react-redux";
import { SearchUsernameFormModel } from "../../components/forms/search-username-form/SearchUsernameForm";
import { UserSearchResult } from "../../models/userSearchResult";
import {
  searchUser,
  USER_SEARCH_STATUS_PENDING,
} from "../../slices/userSearch";
import { RootState, useAppDispatch } from "../../store/store";

const useUserQuery = (): [
  UserSearchResult | undefined,
  number,
  number,
  (data: SearchUsernameFormModel, page: number) => void,
  string[],
  boolean
] => {
  const appDispatch = useAppDispatch();
  const { userSearchResult, numberUserPerPage, pagesToIndex, status, errors } =
    useSelector((state: RootState) => state.userSearch);
  const queryUser = useCallback(
    (data: SearchUsernameFormModel, page: number) => {
      if (
        data.username === userSearchResult?.searchString &&
        page === userSearchResult?.page
      )
        return;
      appDispatch(searchUser({ searchString: data.username, page: page }));
    },
    [appDispatch, userSearchResult]
  );
  return [
    userSearchResult,
    numberUserPerPage,
    pagesToIndex,
    queryUser,
    errors,
    status === USER_SEARCH_STATUS_PENDING,
  ];
};

export default useUserQuery;
