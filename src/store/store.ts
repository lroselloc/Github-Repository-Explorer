import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSearchReducer from "../slices/userSearch";
import loadingReducer from "../slices/loading";
import userRepositorySearchReducer from "../slices/userRepositorySearch";
import alertReducer from "../slices/alert";

export const rootReducer = combineReducers({
  userSearch: userSearchReducer,
  loading: loadingReducer,
  userRepositorySearch: userRepositorySearchReducer,
  alert: alertReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type AppState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export default store;
