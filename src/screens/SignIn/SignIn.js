import { setAlert } from "../../utils/alert";
import { useDispatch } from "react-redux";
import api from "../../utils/api";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { setToken } from "../../utils/redux/tokenSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) emailRef.current.value = savedEmail;
  }, [emailRef]);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
    for (const element of event.target.elements) {
      if (element.nodeName === "INPUT") {
        formData[element.id] = element.type === "checkbox" ? element.checked : element.value;
      }
    }
    const { username: email, password, rememberMe } = formData;
    const { data, error } = await api.login(email, password);
    if (error?.status === 400) return setAlert("Invalid credentials.", "warning")(dispatch);
    if (error?.status === 500) return setAlert("Internal server error.", "danger")(dispatch);
    if (error) return setAlert("Something went wrong.", "warning")(dispatch);
    if (rememberMe && email) localStorage.setItem("email", email);
    if (!rememberMe) localStorage.removeItem("email");
    if (data?.body?.token) {
      localStorage.setItem("token", data.body.token);
      dispatch(setToken(data.body.token));
      navigate("/profile");
    }
  };
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input ref={emailRef} type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}
