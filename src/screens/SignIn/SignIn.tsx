import useLoginForm from "./useLoginForm";

import { Spinner } from "../../components";

import "./SignIn.css";

export default function SignIn() {
  const { handleSubmit, emailRef, loginLoading } = useLoginForm();
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
            <input type="checkbox" id="rememberMe" name="rememberMe" defaultChecked />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          {loginLoading ? <Spinner /> : <button className="sign-in-button">Sign In</button>}
        </form>
      </section>
    </main>
  );
}
