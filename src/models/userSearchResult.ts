import { UserSearchResponse } from "./userSearchResponse";

export interface UserSearchResult {
  page: number;
  searchString: string;
  results: UserSearchResponse;
}
