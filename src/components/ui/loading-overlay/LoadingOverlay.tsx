import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
export const LOADING_OVERLAY_TEST_ID = "loading-overlay";
const LoadingOverlay = () => {
  const { numberLoading } = useSelector((state: RootState) => state.loading);
  return (
    <div
      data-testid={LOADING_OVERLAY_TEST_ID}
      className={numberLoading ? "loading" : "non-loading"}
    />
  );
};

export default LoadingOverlay;
