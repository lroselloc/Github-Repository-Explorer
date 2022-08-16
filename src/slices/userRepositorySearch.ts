import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIRateLimitExceededError } from "../api/apiService";
import { getUserRepositories } from "../api/userRepositoryService";
import { UserRepositorySearchData } from "../models/userRepositorySearchData";
import { UserRepositorySearchResult } from "../models/userRepositorySearchResult";
import { UsersRepositories } from "../models/usersRepositories";
import { RootState } from "../store/store";

export const USER_REPOSITORY_SEARCH_IDLE = "idle";

export const USER_REPOSITORY_SEARCH_PENDING = "pending";

export type UserRepositorySearchStatus = "idle" | "pending";

export interface UserRepositorySearchState {
  usersRepositories: UsersRepositories;
  status: UserRepositorySearchStatus;
  numberRepositoriesPerPage: number;
  errors: string[];
  maxNumResults: number;
}

const initialState: UserRepositorySearchState = {
  usersRepositories: {},
  status: USER_REPOSITORY_SEARCH_IDLE,
  numberRepositoriesPerPage: 50,
  maxNumResults: 1000,
  errors: [],
};

export const searchUserRepository = createAsyncThunk<
  UserRepositorySearchResult,
  UserRepositorySearchData,
  { state: RootState }
>(
  "search/user/repository",
  async (userRepositorySearchData, { getState, rejectWithValue }) => {
    try {
      const { userRepositorySearch } = getState();
      const data = await getUserRepositories(
        userRepositorySearchData,
        userRepositorySearch.numberRepositoriesPerPage
      );
      return {
        page: userRepositorySearchData.page,
        username: userRepositorySearchData.username,
        results: data,
      };
    } catch (exception) {
      if (exception instanceof APIRateLimitExceededError) {
        return rejectWithValue(exception.message);
      }

      return rejectWithValue(
        "There was an error while trying to fetch the user's repositories!"
      );
    }
  }
);

const userRepositorySearchSlice = createSlice({
  name: "userRepositorySearch",
  initialState: initialState,
  reducers: {
    cleanUserRepositories: (state: UserRepositorySearchState) => {
      state.usersRepositories = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      searchUserRepository.pending,
      (state: UserRepositorySearchState) => {
        state.status = USER_REPOSITORY_SEARCH_PENDING;
        state.errors = [];
      }
    );

    builder.addCase(
      searchUserRepository.fulfilled,
      (
        state: UserRepositorySearchState,
        action: PayloadAction<UserRepositorySearchResult>
      ) => {
        state.status = USER_REPOSITORY_SEARCH_IDLE;
        const username = action.payload.username;
        const results = {
          totalCount:
            action.payload.results.total_count > state.maxNumResults
              ? state.maxNumResults
              : action.payload.results.total_count,
          currentPage: action.payload.page,
          repositories: (state.usersRepositories[username] && [
            ...state.usersRepositories[username].repositories,
            ...action.payload.results.items,
          ]) || [...action.payload.results.items],
        };
        state.usersRepositories[username] = results;
      }
    );
    builder.addCase(
      searchUserRepository.rejected,
      (state: UserRepositorySearchState, action) => {
        state.status = USER_REPOSITORY_SEARCH_IDLE;
        state.errors = [(action.payload as string) || ""];
      }
    );
  },
});

export const { cleanUserRepositories } = userRepositorySearchSlice.actions;

export default userRepositorySearchSlice.reducer;
