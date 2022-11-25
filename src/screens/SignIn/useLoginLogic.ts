import { ChangeEvent, RefObject, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useApi from "../../hooks/useApi";
import { login } from "../../utils/api";

export default function useLoginLogic() {
  const emailRef = useRef<HTMLInputElement>(null);
  useFillRememberedEmail(emailRef);
  const { handleSubmit, loginLoading } = useLoginForm();
  useRedirectOnLogin();

  return { emailRef, handleSubmit, loginLoading };
}

function useFillRememberedEmail(emailRef: RefObject<HTMLInputElement>) {
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail && emailRef.current) emailRef.current.value = savedEmail;
  }, [emailRef]);
}

function useRedirectOnLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/profile");
  }, [navigate]);
}

function useLoginForm() {
  const [loginRequest, loginLoading] = useApi(login);

  const handleSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = Object.fromEntries(new FormData(event.target).entries());
      const { username: email, password, rememberMe } = formData;

      const { error } = await loginRequest(email.toString().trim(), password);
      if (error) return;
      if (rememberMe && email) localStorage.setItem("email", email.toString().trim());
      if (!rememberMe) localStorage.removeItem("email");
    },
    [loginRequest]
  );
  return { handleSubmit, loginLoading };
}
