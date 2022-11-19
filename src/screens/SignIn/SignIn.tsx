import { ChangeEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { login } from "../../utils/api";

import Spinner from "../../components/Spinner";

import "./SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  const [loginRequest, loginLoading] = useApi(login);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail && emailRef.current) emailRef.current.value = savedEmail;
  }, [emailRef]);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target).entries());
    const { username: email, password, rememberMe } = formData;

    const { error } = await loginRequest(email, password);
    if (error) return;
    if (rememberMe && email) localStorage.setItem("email", email.toString());
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
            <input ref={emailRef} type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          {loginLoading ? <Spinner /> : <button className="sign-in-button">Sign In</button>}
        </form>
      </section>
    </main>
  );
}
