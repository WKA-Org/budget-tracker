import "./App.scss";
import {Routes, Route} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
