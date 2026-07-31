import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PgListing from "../pages/PgListing";
import PgDetails from "../pages/PgDetails";
import UserDashboard from "../pages/UserDashboard";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import MyBookings from "../pages/MyBookings";
import Wishlist from "../pages/Wishlist";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pgs" element={<PgListing />} />
        <Route path="/pg/:id" element={<PgDetails />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
          <Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  }
/>
<Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;