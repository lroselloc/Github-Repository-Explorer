import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchUsernameFormModel } from "../../components/forms/search-username-form/SearchUsernameForm";
import { UserSearchResult } from "../../models/userSearchResult";
import { cleanUserRepositories } from "../../slices/userRepositorySearch";
import {
  searchUser,
  USER_SEARCH_STATUS_PENDING,
} from "../../slices/userSearch";
import { RootState, useAppDispatch } from "../../store/store";

const useUserQuery = (): [
  UserSearchResult | undefined,
  number,
  number,
  (data: SearchUsernameFormModel, page: number) => Promise<void>,
  string[],
  boolean
] => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const { userSearchResult, numberUserPerPage, pagesToIndex, status, errors } =
    useSelector((state: RootState) => state.userSearch);
  const queryUser = useCallback(
    async (data: SearchUsernameFormModel, page: number) => {
      if (
        data.username === userSearchResult?.searchString &&
        page === userSearchResult?.page
      )
        return;
      await appDispatch(
        searchUser({ searchString: data.username, page: page })
      );
      dispatch(cleanUserRepositories());
    },
    [appDispatch, dispatch, userSearchResult]
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
