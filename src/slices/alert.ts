import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export enum ALERT_TYPES {
  SUCCESS = 0,
  ERROR = 1,
  WARNING = 2,
}

export interface AddAlertPayload {
  message: string;
  alertType: ALERT_TYPES;
  timeout?: number;
}

export interface Alert {
  id: string;
  message: string;
  alertType: ALERT_TYPES;
  timeout: number;
}
export interface AlertState {
  alerts: Alert[];
}

const initialState: AlertState = {
  alerts: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state: AlertState, action: PayloadAction<AddAlertPayload>) => {
      const alert: Alert = { timeout: 5000, ...action.payload, id: uuidv4() };
      state.alerts.push(alert);
    },
    removeAlert: (state: AlertState, action: PayloadAction<Alert>) => {
      const index = state.alerts.findIndex(
        (alert: Alert) => alert.id === action.payload.id
      );
      state.alerts.splice(index, 1);
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
