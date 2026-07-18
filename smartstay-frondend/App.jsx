import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import FindPG from './pages/FindPG';
import PGDetails from './pages/PGDetails';
import Booking from './pages/Booking';
import BookingSuccess from './pages/BookingSuccess';
import Wishlist from './pages/Wishlist';
import Dashboard from './pages/Dashboard';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import MyReviews from './pages/MyReviews';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

import './App.css';

// Scroll to top helper on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  useEffect(() => {
    // Initial page load navbar animations
    gsap.fromTo('.navbar', 
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="app-container">
      {/* Scroll Management */}
      <ScrollToTop />

      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Routed Pages Shell */}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find-pg" element={<FindPG />} />
          <Route path="/pg/:id" element={<PGDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Minimalist 5-Column Footer */}
      <Footer />
    </div>
  );
};

export default App;
