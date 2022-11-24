import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";

import { removeAlert } from "../../utils/redux/alertSlice";

import { RootSate } from "../../utils/redux/store";

import "./Alerts.css";

const animatioDuration = 250;

const Alert = ({ startTime, message, type, duration }: IAlert) => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let startAnimationTimeout: number, removeAlertTimeout: number;
    (() => {
      if (!duration || !dispatch || !startTime) return;
      const currentTime = Date.now();
      let reamingTime = startTime + duration - currentTime;
      reamingTime = reamingTime > 0 ? reamingTime : 0;
      startAnimationTimeout = setTimeout(() => setIsVisible(false), reamingTime);
      removeAlertTimeout = setTimeout(() => dispatch(removeAlert(startTime)), reamingTime + animatioDuration);
    })();
    return () => {
      clearTimeout(startAnimationTimeout);
      clearTimeout(removeAlertTimeout);
    };
  }, [duration, startTime, dispatch]);

  const closeAlert = () => {
    setIsVisible(false);
    setTimeout(() => dispatch(removeAlert(startTime)), animatioDuration);
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
        {[[...alerts].reverse().map((alert) => <Alert key={alert.startTime} {...alert} />)]}
      </section>
    )) || <></>
  );
}

const mapStateToProps = (state: RootSate) => ({ alerts: state.alert });

export default connect(mapStateToProps)(Alerts);
