import { ChangeEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { login } from "../../utils/api";

export default function useLoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);

  const [loginRequest, loginLoading] = useApi(login);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail && emailRef.current) emailRef.current.value = savedEmail;
  }, [emailRef]);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/profile");
  }, [navigate]);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target).entries());
    const { username: email, password, rememberMe } = formData;

    const { error } = await loginRequest(email.toString().trim(), password);
    if (error) return;
    if (rememberMe && email) localStorage.setItem("email", email.toString().trim());
    if (!rememberMe) localStorage.removeItem("email");
  };

  return { handleSubmit, emailRef, loginLoading };
}
