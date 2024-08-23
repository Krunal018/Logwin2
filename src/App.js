import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./Redux/ProtectedRout";
import ThemeWrapper from "./Redux/ThemeWrapper";
import Navbar from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import Home from "./Pages/Home/allComponent/Home";
import Cart from "./Pages/Home/allComponent/components/Cart";
import Login from "./Pages/Login";
import CartPage from "./Pages/Home/allComponent/components/CartPage";

const AppContent = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const hideNavbar = location.pathname === "/login";

  return (
    <ThemeWrapper>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/cart/:productId"
          element={<ProtectedRoute element={<Cart />} />} // Add this line
        />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </ThemeWrapper>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
