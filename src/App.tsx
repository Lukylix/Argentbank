import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, SignIn, Profile, Account } from "./screens";
import { Header, Footer, Alerts } from "./components";

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
