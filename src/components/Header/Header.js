import { Link } from "react-router-dom";
import argentBankLogo from "../../assets/argentBankLogo.png";
import "./Header.css";

export default function Header() {
  return (
    <nav class="main-nav">
      <Link class="main-nav-logo" to="/">
        <img class="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
        <h1 class="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link class="main-nav-item" to="/sign-in">
          <i class="fa fa-user-circle"></i> Sign In
        </Link>
      </div>
    </nav>
  );
}
