import { Repository } from "../../../models/userRepositorySearchResponse";
import RepositoryCard from "../../ui/repository/RepositoryCard";
import useIntersectionObserver from "../../../hooks/ui/useIntersectionObserver";
export interface UserRepositoryListProps {
  repositories: Repository[];
  getNextRepositories: () => any;
}

const UserRepositoryList = ({
  repositories,
  getNextRepositories,
}: UserRepositoryListProps) => {
  const elementObservedCallbackRef = useIntersectionObserver(
    () => void getNextRepositories()
  );
  return (
    <>
      {repositories.map((repository, idx) => {
        return (
          <div
            data-testid={`repository-${idx}`}
            key={`${repository}${idx}`}
            ref={
              idx === repositories.length - 1
                ? elementObservedCallbackRef
                : null
            }
          >
            <RepositoryCard repository={{ ...repository }} />
          </div>
        );
      })}
    </>
  );
};
export default UserRepositoryList;
