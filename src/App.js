import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import SignIn from "./screens/SignIn";
import Account from "./screens/Account";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Alerts from "./components/Alerts";
import { store } from "./utils/redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Alerts />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/account/:accountId" element={<Account />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
