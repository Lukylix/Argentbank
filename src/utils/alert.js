import { addAlert, removeAlert } from "./redux/alertSlice";
// curried function (thunk redux)
export const setAlert =
  (message, alertType, time = 4000) =>
  (dispatch) => {
    const id = Date.now();
    dispatch(addAlert({ message, alertType, time, id }));
    setTimeout(() => dispatch(removeAlert(id)), time);
  };
