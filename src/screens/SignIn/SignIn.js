import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner";

import useApi from "../../hooks/useApi";
import { login } from "../../utils/api";

import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const [loginRequest, loginLoading] = useApi(login);

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
    const { error } = await loginRequest(email, password);
    if (error) return;
    if (rememberMe && email) localStorage.setItem("email", email);
    if (!rememberMe) localStorage.removeItem("email");
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
          {loginLoading ? <Spinner /> : <button className="sign-in-button">Sign In</button>}
        </form>
      </section>
    </main>
  );
}
