import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../../utils/alert";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/redux/userSlice";
import { setToken } from "../../utils/redux/tokenSlice";
import api from "../../utils/api";
import argentBankLogo from "../../assets/argentBankLogo.png";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokenLocalSorage = localStorage.getItem("token");
  const tokenRedux = useSelector((state) => state.token);
  const firstName = useSelector((state) => state.user?.firstName);

  useEffect(() => {
    if (!tokenRedux && !tokenLocalSorage) return navigate("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      (async () => {
        if (!tokenRedux && !tokenLocalSorage) return;
        if (!tokenRedux && tokenLocalSorage) return dispatch(setToken(tokenLocalSorage));
        const { data, error } = await api.getUserProfile(tokenRedux || tokenLocalSorage);
        if (error?.status === 400 || error?.status === 401) {
          dispatch(setAlert("Session expired.", "warning"));
          logout();
          return;
        }
        if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
        if (error) return dispatch(setAlert("Something went wrong.", "warning"));
        if (data?.body) dispatch(setUser(data.body));
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokenRedux]
  );

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setUser({}));
    navigate("/");
  };

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
