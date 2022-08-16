import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import useUserRepositoryQuery from "../../hooks/user-repository-search/useUserRepositoryQuery";
import useUserQuery from "../../hooks/user-search/useUserQuery";
import { addAlert, ALERT_TYPES } from "../../slices/alert";
import { popLoading, pushLoading } from "../../slices/loading";
import { cleanUserRepositories } from "../../slices/userRepositorySearch";
import SearchUsernameForm, {
  SearchUsernameFormModel,
} from "../forms/search-username-form/SearchUsernameForm";
import UserList from "../lists/user-list/UserList";
import Paginator from "../ui/paginator/Paginator";

const schema = yup.object().shape({
  username: yup.string().max(39).required(),
});

const SearchUserPage = () => {
  const dispatch = useDispatch();
  const [
    userSearchResult,
    numberUserPerPage,
    pagesToIndex,
    queryUser,
    userSearchErrors,
    userSearchLoading,
  ] = useUserQuery();

  const [
    usersRepositories,
    getUserRepositories,
    getNextUserRepositories,
    userRepositoriesSearchErrors,
    userRepositoriesSearchLoading,
  ] = useUserRepositoryQuery();

  const loading = useMemo(
    () => userRepositoriesSearchLoading || userSearchLoading,
    [userSearchLoading, userRepositoriesSearchLoading]
  );

  const formik = useFormik<SearchUsernameFormModel>({
    initialValues: {
      username: userSearchResult?.searchString || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      queryUser(values, 1);
    },
  });

  const displayErrors = useCallback(
    (errors: string[]) => {
      if (errors.length) {
        dispatch(
          addAlert({
            message: errors[errors.length - 1],
            alertType: ALERT_TYPES.ERROR,
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    displayErrors(userRepositoriesSearchErrors);
  }, [displayErrors, userRepositoriesSearchErrors]);

  useEffect(() => {
    displayErrors(userSearchErrors);
  }, [displayErrors, userSearchErrors]);

  useEffect(() => {
    loading ? dispatch(pushLoading()) : dispatch(popLoading());
  }, [dispatch, loading]);

  useEffect(() => {
    if (userSearchResult) {
      dispatch(cleanUserRepositories());
    }
  }, [dispatch, userSearchResult]);

  const [activeUser, setActiveUser] = useState("");

  const currentPage = useMemo(
    () => (!!userSearchResult?.page ? userSearchResult.page : 0),
    [userSearchResult]
  );

  return (
    <>
      <SearchUsernameForm {...formik} isSubmitting={userSearchLoading} />
      <br />
      {userSearchResult && !userSearchResult.results.total_count && (
        <p>No users with "{userSearchResult.searchString}" were found</p>
      )}
      {!!userSearchResult && !!userSearchResult.results.total_count && (
        <>
          <p>Showing users for "{userSearchResult.searchString}"</p>
          <UserList
            users={userSearchResult.results.items}
            usersRepositories={usersRepositories}
            getUserRepositories={getUserRepositories}
            getNextUserRepositores={getNextUserRepositories}
            activeUser={activeUser}
            setActiveUser={setActiveUser}
          />
          {userSearchResult.results.total_count > numberUserPerPage && (
            <div className=" d-flex justify-content-center">
              <Paginator
                currentPage={currentPage}
                pagesToIndex={pagesToIndex}
                onClick={(page: number) => {
                  queryUser({ username: userSearchResult.searchString }, page);
                }}
                totalCount={userSearchResult.results.total_count}
                elementsPerPage={numberUserPerPage}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchUserPage;
