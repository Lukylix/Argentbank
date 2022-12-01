import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../../utils/redux/userSlice";
import { setToken } from "../../utils/redux/tokenSlice";
import useApi from "../../hooks/useApi";
import { getUserProfile } from "../../utils/api";

import argentBankLogo from "../../assets/argentBankLogo.png";
import "./Header.css";

import { RootSate } from "../../utils/redux/store";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenRedux = useSelector((state: RootSate) => state.token);
  const firstName = useSelector((state: RootSate) => state.user?.firstName);

  const tokenLocalSorage = localStorage.getItem("token");
  const [getUserProfileRequest] = useApi(getUserProfile);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setUser({}));
    navigate("/");
  };

  useEffect(() => {
    (() => {
      if (!dispatch || !getUserProfileRequest || !navigate) return;
      if (!tokenRedux && !tokenLocalSorage) return;
      if (!tokenRedux && tokenLocalSorage) return dispatch(setToken(tokenLocalSorage));
      getUserProfileRequest(tokenRedux);
    })();
  }, [tokenLocalSorage, tokenRedux, dispatch, getUserProfileRequest, navigate]);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {tokenRedux ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i> {firstName}
            </Link>
            <button className="main-nav-item" onClick={logout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
