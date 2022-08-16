import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { Alert, ALERT_TYPES } from "../../../slices/alert";
import { useEffect, useMemo } from "react";
import { removeAlert } from "../../../slices/alert";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

export const Notifier = () => {
  const { alerts } = useSelector((state: RootState) => state.alert);
  const toastOptions = useMemo(
    (): ToastOptions => ({
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }),
    []
  );
  const dispatch = useDispatch();

  const alertDict = useMemo(
    () => ({
      [ALERT_TYPES.SUCCESS]: toast.success,
      [ALERT_TYPES.ERROR]: toast.error,
      [ALERT_TYPES.WARNING]: toast.warn,
    }),
    []
  );

  useEffect(() => {
    if (alerts.length) {
      alerts.forEach((alert: Alert) => {
        alertDict[alert.alertType](alert.message, {
          ...toastOptions,
          autoClose: alert.timeout,
        });
        dispatch(removeAlert(alert));
      });
    }
  }, [alerts, alertDict, dispatch, toastOptions]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      ></ToastContainer>
    </>
  );
};

export default Notifier;
