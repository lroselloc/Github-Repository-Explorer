import { UserSearchData } from "../models/userSearchData";
import { UserSearchResponse } from "../models/userSearchResponse";
import { get } from "./apiService";

export const getUsers = async (
  userSearchData: UserSearchData,
  resultsPerPage: number
) => {
  const url = `search/users?q=${encodeURIComponent(
    `${userSearchData.searchString} in:login`
  )}&per_page=${resultsPerPage}&page=${userSearchData.page}`;
  const result = await get<UserSearchResponse>(url);
  return result;
};
