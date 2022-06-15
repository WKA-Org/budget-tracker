import "./App.scss";
import {Routes, Route, useHistory} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
