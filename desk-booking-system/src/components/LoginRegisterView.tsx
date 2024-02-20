import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

function LoginRegisterView() {
  return (
    <div className="flex flex-row justify-center h-screen mt-10 max-sm:mt-4">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default LoginRegisterView;
