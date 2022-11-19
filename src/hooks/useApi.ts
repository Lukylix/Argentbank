import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../utils/redux/userSlice";
import { setToken } from "../utils/redux/tokenSlice";

import { ApiFunction } from "../utils/api";

export default function useApi(apifunc: ApiFunction) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<{ message: string; status?: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setUser({}));
    navigate("/");
  };

  const request = async (...args: any[]) => {
    setLoading(true);
    // @ts-ignore
    const { data, error } = await apifunc(...args)(dispatch, navigate, logout);
    setData(data);
    setError(error);
    setLoading(false);
    return { data, error };
  };
  return [request, loading, data, error];
}
