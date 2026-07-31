import { Routes, Route, Navigate } from "react-router-dom";

// ========== USER PAGES ==========
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindPG from "./pages/FindPG";
import PGDetails from "./pages/PGDetails";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import MyReviews from "./pages/MyReviews";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// ========== ADMIN PAGES ==========
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOwners from "./pages/admin/AdminOwners";
import AdminPgs from "./pages/admin/AdminPgs";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminReports from "./pages/admin/AdminReports";
import AdminLayout from "./components/admin/AdminLayout";

// ========== OWNER PAGES ==========
import OwnerLogin from "./pages/owner/OwnerLogin";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import MyPgs from "./pages/owner/MyPgs";
import Rooms from "./pages/owner/Rooms";
import Bookings from "./pages/owner/Bookings";
import OwnerProfile from "./pages/owner/Profile";
import OwnerChangePassword from "./pages/owner/ChangePassword";

// ========== CHATBOT ==========
import ChatBot from "./components/ChatBot";

// ================= ADMIN PROTECTED ROUTE =================
const AdminProtectedRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");
  return admin ? children : <Navigate to="/admin/login" replace />;
};

// ================= OWNER PROTECTED ROUTE =================
const OwnerProtectedRoute = ({ children }) => {
  const owner = localStorage.getItem("owner");
  return owner ? children : <Navigate to="/owner/login" replace />;
};

function App() {
  return (
    <>
      {/* ========== ROUTES ========== */}
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find-pg" element={<FindPG />} />
        <Route path="/pg/:id" element={<PGDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking-success" element={<BookingSuccess />} />

        {/* ================= USER PROTECTED ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-reviews"
          element={
            <ProtectedRoute>
              <MyReviews />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/owners"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminOwners />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/pgs"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminPgs />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminBookings />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminReviews />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminReports />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        {/* ================= OWNER ROUTES ================= */}
        <Route path="/owner/login" element={<OwnerLogin />} />
        
        <Route
          path="/owner/dashboard"
          element={
            <OwnerProtectedRoute>
              <OwnerDashboard />
            </OwnerProtectedRoute>
          }
        />
        <Route
          path="/owner/pgs"
          element={
            <OwnerProtectedRoute>
              <MyPgs />
            </OwnerProtectedRoute>
          }
        />
        <Route
          path="/owner/rooms"
          element={
            <OwnerProtectedRoute>
              <Rooms />
            </OwnerProtectedRoute>
          }
        />
        <Route
          path="/owner/bookings"
          element={
            <OwnerProtectedRoute>
              <Bookings />
            </OwnerProtectedRoute>
          }
        />
        <Route
          path="/owner/profile"
          element={
            <OwnerProtectedRoute>
              <OwnerProfile />
            </OwnerProtectedRoute>
          }
        />
        <Route
          path="/owner/change-password"
          element={
            <OwnerProtectedRoute>
              <OwnerChangePassword />
            </OwnerProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ========== CHATBOT - Global Component ========== */}
      <ChatBot />
    </>
  );
}

export default App;