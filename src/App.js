import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/nav-kopi";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import "./App.scss";
import Hobbies from "./pages/Hobbies";
import Words from "./pages/Words";
import Facts from "./pages/Facts";
import Weather1 from "./pages/weather/Weather1";
import Weather2 from "./pages/weather/Weather2";
import Weather3 from "./pages/weather/Weather3";
import Test from "./pages/weather/test";

function App() {
  return (
    <Router>
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/hobby" element={<Hobbies />}></Route>
          <Route path="/words" element={<Words />}></Route>

          <Route path="/facts" element={<Facts />}></Route>
          <Route path="/weather1" element={<Weather1 />}></Route>
          <Route path="/weather2" element={<Weather2 />}></Route>
          <Route path="/weather3" element={<Weather3 />}></Route>

          <Route path="/test" element={<Test />}></Route>

          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
