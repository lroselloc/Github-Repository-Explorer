import { Repository } from "./userRepositorySearchResponse";

export interface UsersRepositories {
  [user: string]: {
    totalCount: number;
    currentPage: number;
    repositories: Repository[];
  };
}
