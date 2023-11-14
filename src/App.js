import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Updated imports
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {" "}
        {/* Updated to 'Routes' instead of 'Switch' */}
        <Route path="/" element={<AuthForm />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />{" "}
        {/* Updated redirect */}
      </Routes>
    </Router>
  );
};

export default App;
