import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSearchData } from "../models/userSearchData";
import { UserSearchResult } from "../models/userSearchResult";
import { getUsers } from "../api/userService";
import { RootState } from "../store/store";
import { APIRateLimitExceededError } from "../api/apiService";

export const USER_SEARCH_STATUS_IDLE = "idle";

export const USER_SEARCH_STATUS_PENDING = "pending";

export type UserSearchStatus = "idle" | "pending";

export interface UserSearchState {
  userSearchResult?: UserSearchResult;
  numberUserPerPage: number;
  status: UserSearchStatus;
  errors: string[];
  pagesToIndex: number;
  maxNumResults: number;
}
const initialState: UserSearchState = {
  numberUserPerPage: 5,
  status: USER_SEARCH_STATUS_IDLE,
  errors: [],
  pagesToIndex: 5,
  maxNumResults: 1000,
};

export const searchUser = createAsyncThunk<
  UserSearchResult,
  UserSearchData,
  { state: RootState }
>("search/user", async (userSearchData, { getState, rejectWithValue }) => {
  try {
    const { userSearch } = getState();
    const data = await getUsers(userSearchData, userSearch.numberUserPerPage);
    return {
      page: userSearchData.page,
      searchString: userSearchData.searchString,
      results: data,
    };
  } catch (exception) {
    if (exception instanceof APIRateLimitExceededError) {
      return rejectWithValue(exception.message);
    }
    return rejectWithValue(
      "An error occurred while trying to search for this user!"
    );
  }
});

const userSearchStatusSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUser.pending, (state: UserSearchState) => {
      state.status = USER_SEARCH_STATUS_PENDING;
      state.errors = [];
    });

    builder.addCase(
      searchUser.fulfilled,
      (state: UserSearchState, action: PayloadAction<UserSearchResult>) => {
        state.status = USER_SEARCH_STATUS_IDLE;
        state.userSearchResult = {
          ...action.payload,
          results: {
            ...action.payload.results,
            total_count:
              action.payload.results.total_count > state.maxNumResults
                ? state.maxNumResults
                : action.payload.results.total_count,
          },
        };
      }
    );
    builder.addCase(searchUser.rejected, (state: UserSearchState, action) => {
      state.status = USER_SEARCH_STATUS_IDLE;
      state.errors = [(action.payload as string) || ""];
    });
  },
});

export default userSearchStatusSlice.reducer;
