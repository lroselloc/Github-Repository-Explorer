import { UserRepositorySearchData } from "../models/userRepositorySearchData";
import { UserRepositorySearchResponse } from "../models/userRepositorySearchResponse";
import { get } from "./apiService";

export const getUserRepositories = async (
  userRepositorySearchData: UserRepositorySearchData,
  resultsPerPage: number
) => {
  const url = `search/repositories?q=${encodeURIComponent(
    `user:${userRepositorySearchData.username}`
  )}&per_page=${resultsPerPage}&page=${userRepositorySearchData.page}`;
  const result = await get<UserRepositorySearchResponse>(url);
  return result;
};
