import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";

import { removeAlert } from "../../utils/redux/alertSlice";

import { RootSate } from "../../utils/redux/store";

import "./Alerts.css";

const animatioDuration = 250;

const Alert = ({ alert: { id, message, type, time } }: IAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setIsVisible(false), time - animatioDuration);
  }, [time]);

  const closeAlert = () => {
    setIsVisible(false);
    setTimeout(() => dispatch(removeAlert(id)), animatioDuration);
  };

  const captialize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={`alert ${type} ${isVisible ? "" : "hide"}`}>
      <span onClick={closeAlert} className="closebtn">
        &times;
      </span>
      <strong>{captialize(type)}!</strong> {message}
    </div>
  );
};

function Alerts({ alerts }: { alerts: IAlert[] }) {
  return (
    (alerts?.length > 0 && (
      <section className="alerts">
        {[[...alerts].reverse().map((alert) => <Alert key={alert.id} alert={alert} />)]}
      </section>
    )) || <></>
  );
}

const mapStateToProps = (state: RootSate) => ({ alerts: state.alert });

export default connect(mapStateToProps)(Alerts);
