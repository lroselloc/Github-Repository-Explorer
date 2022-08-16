import { Accordion } from "react-bootstrap";
import { User } from "../../../models/userSearchResponse";
import { UsersRepositories } from "../../../models/usersRepositories";
import UserRepositoryList from "../user-repository-list/UserRepositoryList";

export interface UserListProps {
  users: User[];
  usersRepositories: UsersRepositories;
  activeUser?: string;
  setActiveUser: (login: string) => any;
  getUserRepositories: (
    userLogin: string,
    userRepositories: UsersRepositories
  ) => void;
  getNextUserRepositores: (
    userLogin: string,
    userRepositories: UsersRepositories
  ) => void;
}

const UserList = ({
  users,
  usersRepositories,
  getUserRepositories,
  getNextUserRepositores,
  setActiveUser,
  activeUser,
}: UserListProps) => (
  <Accordion
    className="accordion-flush"
    activeKey={
      (activeUser && activeUser in usersRepositories && activeUser) || ""
    }
    onSelect={(eventKey) => {
      let userLogin = "";
      if (eventKey) {
        userLogin = eventKey as string;
        getUserRepositories(userLogin, usersRepositories);
      }
      setActiveUser(userLogin);
    }}
  >
    {users.map((user: User) => {
      return (
        <Accordion.Item eventKey={user.login} key={user.login} className="mb-2">
          <Accordion.Header>{user.login}</Accordion.Header>
          <Accordion.Body hidden={user.login !== activeUser}>
            {user.login in usersRepositories &&
              ((!!usersRepositories[user.login].repositories.length && (
                // User has repositories
                <div className="ms-3 user-repository-list">
                  {user.login in usersRepositories && (
                    <UserRepositoryList
                      repositories={usersRepositories[user.login].repositories}
                      getNextRepositories={() =>
                        getNextUserRepositores(user.login, usersRepositories)
                      }
                    />
                  )}
                </div>
              )) || <p>No repositories were found for {user.login}</p>)}
          </Accordion.Body>
        </Accordion.Item>
      );
    })}
  </Accordion>
);

export default UserList;
