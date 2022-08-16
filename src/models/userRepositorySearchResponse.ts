export interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

export interface UserRepositorySearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}
