import { UserRepositorySearchResponse } from "./userRepositorySearchResponse";

export interface UserRepositorySearchResult {
  page: number;
  username: string;
  results: UserRepositorySearchResponse;
}
