import { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";

import { removeAlert } from "../../utils/redux/alertSlice";

import "./Alerts.css";

const Alert = ({ alert: { id, message, type, time } }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsVisible(false), time - 250);
  }, [time]);
  const closeAlert = () => {
    setIsVisible(false);
    setTimeout(() => dispatch(removeAlert(id)), 250);
  };
  const captialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <div className={`alert ${type} ${isVisible ? "" : "hide"}`}>
      <span onClick={closeAlert} className="closebtn">
        &times;
      </span>
      <strong>{captialize(type)}!</strong> {message}
    </div>
  );
};

function Alerts({ alerts }) {
  return (
    alerts?.length > 0 && (
      <section className="alerts">
        {[[...alerts].reverse().map((alert) => <Alert key={alert.id} alert={alert} />)]}
      </section>
    )
  );
}

const mapStateToProps = (state) => ({ alerts: state.alert });

export default connect(mapStateToProps)(Alerts);
