import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../utils/redux/userSlice";
import { setToken } from "../utils/redux/tokenSlice";

import { ApiFunction } from "../utils/api";

type useApiHook = [
  (...args: any[]) => ReturnType<ReturnType<ApiFunction>>,
  boolean,
  any,
  { message: string; status?: number } | null
];

export default function useApi(apifunc: (...args: any[]) => ReturnType<ApiFunction>): useApiHook {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<{ message: string; status?: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setUser({}));
    navigate("/");
  }, [navigate, dispatch]);

  const request = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      const { data, error } = await apifunc(...args)(dispatch, navigate, logout);
      setData(data);
      setError(error);
      setLoading(false);
      return { data, error };
    },
    [apifunc, dispatch, navigate, logout]
  );

  return [request, loading, data, error];
}
