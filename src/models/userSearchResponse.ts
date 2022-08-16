export interface User {
  login: string;
  id: number;
}

export interface UserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}
