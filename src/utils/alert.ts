import { addAlert, removeAlert } from "./redux/alertSlice";
import { AppDispatch } from "./redux/store";
// curried function (thunk redux)
export const setAlert =
  (message: string, type: AlertTypes, time = 4000) =>
  (dispatch: AppDispatch) => {
    const id = Date.now();
    dispatch(addAlert({ message, type, time, id } as Alert));
    setTimeout(() => dispatch(removeAlert(id)), time);
  };
