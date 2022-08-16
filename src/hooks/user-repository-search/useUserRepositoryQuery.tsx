import { useCallback } from "react";
import { useSelector } from "react-redux";
import { UsersRepositories } from "../../models/usersRepositories";

import {
  searchUserRepository,
  USER_REPOSITORY_SEARCH_PENDING,
} from "../../slices/userRepositorySearch";
import { RootState, useAppDispatch } from "../../store/store";

const useUserRepositoryQuery = (): [
  UsersRepositories,
  (
    userLogin: string,
    userRepositories: UsersRepositories,
    page?: number
  ) => Promise<void>,
  (userLogin: string, userRepositories: UsersRepositories) => void,
  string[],
  boolean
] => {
  const appDispatch = useAppDispatch();
  const { usersRepositories, status, errors } = useSelector(
    (state: RootState) => state.userRepositorySearch
  );

  const getUserRepositories = useCallback(
    async (
      userLogin: string,
      userRepositories: UsersRepositories,
      page: number = 1
    ) => {
      if (status === USER_REPOSITORY_SEARCH_PENDING) return;
      if (userLogin in userRepositories && page === 1) {
        return;
      }
      appDispatch(searchUserRepository({ username: userLogin, page: page }));

      return;
    },
    [appDispatch, status]
  );

  const getNextUserRepositories = useCallback(
    (userLogin: string, userRepositories: UsersRepositories) => {
      if (!(userLogin in userRepositories)) return;
      if (
        userRepositories[userLogin].repositories.length ===
        userRepositories[userLogin].totalCount
      )
        return;
      getUserRepositories(
        userLogin,
        userRepositories,
        userRepositories[userLogin].currentPage + 1
      );
    },
    [getUserRepositories]
  );
  return [
    usersRepositories,
    getUserRepositories,
    getNextUserRepositories,
    errors,
    status === USER_REPOSITORY_SEARCH_PENDING,
  ];
};

export default useUserRepositoryQuery;
