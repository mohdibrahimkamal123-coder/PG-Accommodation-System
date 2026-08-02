import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllPgs } from "../services/pgService";
import { addToWishlist, getWishlist, removeFromWishlist } from "../services/wishlistService";
import Swal from 'sweetalert2';

// Royalty-free modern room images for PG card previews
const ROOM_IMAGES = [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
];

// FAQ Data
const FAQ_ITEMS = [
    {
        q: "How does SmartStay verify PG accommodations?",
        a: "Every PG listed on SmartStay undergoes a rigorous physical audit by our field teams. We inspect room quality, food hygiene, safety measures, WiFi speed, and verify owner credentials before adding them to our platform."
    },
    {
        q: "Are there any brokerage or hidden hidden fees?",
        a: "Zero brokerage! SmartStay connects you directly with verified stay operators with complete price transparency. What you see is exactly what you pay."
    },
    {
        q: "Can I schedule a physical or virtual visit before booking?",
        a: "Yes! You can easily request a free physical site visit or schedule a live video walkthrough with the property manager before making any advance payments."
    },
    {
        q: "What amenities are included in the monthly rent?",
        a: "Most PGs include high-speed WiFi, 3-time daily meals, housekeeping, laundry services, 24/7 security, and power backup in the base monthly rent."
    },
    {
        q: "What is the refund policy on deposit money?",
        a: "SmartStay enforces standard 100% deposit protection policies. When you move out with valid notice, your security deposit is refunded directly without unnecessary deductions."
    }
];

const Home = () => {
    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFaq, setActiveFaq] = useState(null);
    const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    
    const user = JSON.parse(localStorage.getItem("user"));

    // Load wishlist when component mounts
    useEffect(() => {
        if (user) {
            loadWishlist();
        }
    }, [user]);

    // Load PGs when component mounts
    useEffect(() => {
        loadPgs();
    }, []);

    const loadPgs = async () => {
        try {
            const data = await getAllPgs();
            setPgs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const loadWishlist = async () => {
        try {
            const data = await getWishlist(user.userId);
            setWishlist(data);
        } catch (err) {
            console.log(err);
        }
    };

    const isWishlisted = (pgId) => {
        return wishlist.some(item => item.pgId === pgId);
    };

    const toggleWishlist = async (pgId) => {
        if (!user) {
            // Cute SweetAlert for login prompt
            const result = await Swal.fire({
                title: '💖 Oops!',
                text: 'You need to login first to save your favorite PGs!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#6366f1',
                cancelButtonColor: '#64748b',
                confirmButtonText: 'Login Now 🚀',
                cancelButtonText: 'Maybe Later',
                background: '#ffffff',
                backdrop: 'rgba(99, 102, 241, 0.1)',
                customClass: {
                    popup: 'rounded-3',
                    title: 'fw-bold',
                    confirmButton: 'btn-gradient-primary',
                    cancelButton: 'btn-outline-secondary'
                }
            });
            
            if (result.isConfirmed) {
                window.location.href = '/login';
            }
            return;
        }

        try {
            const existing = wishlist.find(item => item.pgId === pgId);
            const pg = pgs.find(p => p.pgId === pgId);
            
            if (existing) {
                // Remove from wishlist with cute animation
                await removeFromWishlist(existing.wishlistId);
                
                Swal.fire({
                    title: '💔 Removed!',
                    text: `${pg?.pgName || 'PG'} removed from your wishlist`,
                    icon: 'info',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: '#ffffff',
                    customClass: {
                        popup: 'rounded-3'
                    }
                });
            } else {
                // Add to wishlist with cute celebration
                await addToWishlist({
                    userId: user.userId,
                    pgId: pgId
                });
                
                Swal.fire({
                    title: '❤️ Added to Wishlist!',
                    text: `${pg?.pgName || 'PG'} has been saved to your favorites ✨`,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: '#ffffff',
                    customClass: {
                        popup: 'rounded-3'
                    }
                });
            }
            
            await loadWishlist();
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: '😅 Oops!',
                text: 'Something went wrong. Please try again!',
                icon: 'error',
                confirmButtonColor: '#6366f1',
                background: '#ffffff',
                customClass: {
                    popup: 'rounded-3',
                    confirmButton: 'btn-gradient-primary'
                }
            });
        }
    };

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const inlineStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .smartstay-page-wrapper {
          position: relative !important;
          min-height: 100vh !important;
          background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 40%),
                      radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
                      radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
                      #f8fafc !important;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
          color: #1e293b !important;
          overflow-x: hidden !important;
        }

        /* NAVBAR */
        .smartstay-page-wrapper .smartstay-navbar {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8) !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 1000 !important;
          transition: all 0.3s ease !important;
        }

        .smartstay-page-wrapper .brand-logo {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
          text-decoration: none !important;
          font-weight: 800 !important;
          font-size: 1.35rem !important;
          color: #0f172a !important;
        }

        .smartstay-page-wrapper .brand-icon {
          width: 36px !important;
          height: 36px !important;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
          border-radius: 10px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35) !important;
        }

        .smartstay-page-wrapper .nav-link-custom {
          color: #475569 !important;
          font-weight: 600 !important;
          font-size: 0.95rem !important;
          text-decoration: none !important;
          padding: 8px 16px !important;
          border-radius: 20px !important;
          transition: all 0.2s ease !important;
        }

        .smartstay-page-wrapper .nav-link-custom:hover {
          color: #6366f1 !important;
          background: rgba(99, 102, 241, 0.06) !important;
        }

        .smartstay-page-wrapper .btn-gradient-primary {
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%) !important;
          color: white !important;
          border: none !important;
          font-weight: 600 !important;
          border-radius: 30px !important;
          padding: 10px 24px !important;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35) !important;
          transition: all 0.3s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          text-decoration: none !important;
        }

        .smartstay-page-wrapper .btn-gradient-primary:hover {
          background: linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 22px rgba(99, 102, 241, 0.45) !important;
          color: white !important;
        }

        /* LOGIN AS DROPDOWN */
        .smartstay-page-wrapper .btn-login-dropdown {
          background: #ffffff !important;
          color: #0f172a !important;
          border: 1px solid #e2e8f0 !important;
          font-weight: 700 !important;
          font-size: 0.92rem !important;
          border-radius: 30px !important;
          padding: 8px 18px !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          cursor: pointer !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
          transition: all 0.2s ease !important;
        }

        .smartstay-page-wrapper .btn-login-dropdown:hover {
          border-color: #6366f1 !important;
          color: #6366f1 !important;
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.15) !important;
        }

        .smartstay-page-wrapper .login-dropdown-menu {
          position: absolute !important;
          top: calc(100% + 12px) !important;
          right: 0 !important;
          width: 250px !important;
          background: rgba(255, 255, 255, 0.96) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(226, 232, 240, 0.9) !important;
          border-radius: 20px !important;
          padding: 10px !important;
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.18) !important;
          z-index: 1050 !important;
        }

        .smartstay-page-wrapper .dropdown-header-custom {
          font-size: 0.72rem !important;
          font-weight: 800 !important;
          color: #94a3b8 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
          padding: 8px 12px 6px !important;
        }

        .smartstay-page-wrapper .login-dropdown-item {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 10px 12px !important;
          border-radius: 14px !important;
          text-decoration: none !important;
          transition: all 0.2s ease !important;
        }

        .smartstay-page-wrapper .login-dropdown-item:hover {
          background: #f1f5f9 !important;
        }

        .smartstay-page-wrapper .dropdown-icon-badge {
          width: 36px !important;
          height: 36px !important;
          border-radius: 10px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 1.1rem !important;
        }

        .smartstay-page-wrapper .dropdown-icon-badge.user-bg { background: #eef2ff !important; }
        .smartstay-page-wrapper .dropdown-icon-badge.owner-bg { background: #f0fdf4 !important; }
        .smartstay-page-wrapper .dropdown-icon-badge.admin-bg { background: #fef2f2 !important; }

        .smartstay-page-wrapper .dropdown-title {
          font-weight: 800 !important;
          font-size: 0.88rem !important;
          color: #0f172a !important;
          line-height: 1.2 !important;
        }

        .smartstay-page-wrapper .dropdown-sub {
          font-size: 0.75rem !important;
          color: #64748b !important;
          margin-top: 2px !important;
        }

        /* HERO SECTION */
        .smartstay-page-wrapper .hero-section {
          padding: 60px 0 50px 0 !important;
          position: relative !important;
        }

        .smartstay-page-wrapper .hero-pill-badge {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          background: #eef2ff !important;
          border: 1px solid rgba(99, 102, 241, 0.2) !important;
          color: #4f46e5 !important;
          padding: 6px 16px !important;
          border-radius: 30px !important;
          font-size: 0.85rem !important;
          font-weight: 700 !important;
          margin-bottom: 24px !important;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08) !important;
        }

        .smartstay-page-wrapper .hero-title {
          font-size: 3.5rem !important;
          font-weight: 800 !important;
          line-height: 1.15 !important;
          letter-spacing: -0.02em !important;
          color: #0f172a !important;
          margin-bottom: 20px !important;
        }

        .smartstay-page-wrapper .text-gradient {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }

        .smartstay-page-wrapper .hero-subtitle {
          font-size: 1.1rem !important;
          color: #64748b !important;
          line-height: 1.6 !important;
          max-width: 520px !important;
          margin-bottom: 36px !important;
        }

       
        

        /* HERO STATS */
        .smartstay-page-wrapper .hero-stats {
          display: flex !important;
          align-items: center !important;
          gap: 36px !important;
          margin-top: 36px !important;
        }

        .smartstay-page-wrapper .stat-item h4 {
          font-size: 1.75rem !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          margin-bottom: 2px !important;
        }

        .smartstay-page-wrapper .stat-item p {
          font-size: 0.85rem !important;
          color: #64748b !important;
          font-weight: 500 !important;
          margin: 0 !important;
        }

        /* HERO GRAPHICS RIGHT */
        .smartstay-page-wrapper .hero-image-wrapper {
          position: relative !important;
          padding: 20px !important;
        }

        .smartstay-page-wrapper .hero-main-card {
          position: relative !important;
          border-radius: 28px !important;
          overflow: hidden !important;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25) !important;
          border: 4px solid white !important;
        }

        .smartstay-page-wrapper .hero-main-img {
          width: 100% !important;
          height: 480px !important;
          object-fit: cover !important;
          display: block !important;
          transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
        }

        .smartstay-page-wrapper .hero-main-card:hover .hero-main-img {
          transform: scale(1.03) !important;
        }

        /* Floating Elements */
        .smartstay-page-wrapper .floating-badge-top {
          position: absolute !important;
          top: 36px !important;
          left: 36px !important;
          background: rgba(15, 23, 42, 0.75) !important;
          backdrop-filter: blur(12px) !important;
          color: white !important;
          padding: 8px 16px !important;
          border-radius: 30px !important;
          font-size: 0.82rem !important;
          font-weight: 700 !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          z-index: 2 !important;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2) !important;
        }

        .smartstay-page-wrapper .floating-thumb-top-right {
          position: absolute !important;
          top: -15px !important;
          right: -15px !important;
          width: 130px !important;
          height: 130px !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          border: 4px solid white !important;
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15) !important;
          z-index: 3 !important;
          animation: floatSlow 4s ease-in-out infinite alternate !important;
        }

        .smartstay-page-wrapper .floating-thumb-bottom-left {
          position: absolute !important;
          bottom: 60px !important;
          left: -25px !important;
          width: 120px !important;
          height: 120px !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          border: 4px solid white !important;
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15) !important;
          z-index: 3 !important;
          animation: floatSlow 5s ease-in-out infinite alternate-reverse !important;
        }

        .smartstay-page-wrapper .floating-thumb-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        .smartstay-page-wrapper .floating-rating-bottom {
          position: absolute !important;
          bottom: 30px !important;
          right: 30px !important;
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(12px) !important;
          padding: 10px 18px !important;
          border-radius: 16px !important;
          border: 1px solid white !important;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12) !important;
          z-index: 2 !important;
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
        }

        .smartstay-page-wrapper .rating-star-icon {
          color: #f59e0b !important;
          font-size: 1.1rem !important;
        }

        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }

        /* SECTION TITLE COMMON */
        .smartstay-page-wrapper .section-header {
          display: flex !important;
          justify-content: space-between !important;
          align-items: flex-end !important;
          margin-top: 70px !important;
          margin-bottom: 36px !important;
        }

        .smartstay-page-wrapper .section-title {
          font-size: 2.2rem !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          letter-spacing: -0.01em !important;
          margin-bottom: 6px !important;
        }

        .smartstay-page-wrapper .section-subtitle {
          color: #64748b !important;
          font-size: 1rem !important;
          margin: 0 !important;
        }

        .smartstay-page-wrapper .updated-badge {
          background: #f1f5f9 !important;
          color: #475569 !important;
          font-weight: 600 !important;
          font-size: 0.85rem !important;
          padding: 6px 14px !important;
          border-radius: 20px !important;
          border: 1px solid #e2e8f0 !important;
        }

        /* MODERN PG CARD */
        .smartstay-page-wrapper .pg-card-modern,
        .smartstay-page-wrapper .card.pg-card-modern {
          border: 1px solid #f1f5f9 !important;
          border-radius: 24px !important;
          background: #ffffff !important;
          box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08), 0 10px 20px -10px rgba(0, 0, 0, 0.04) !important;
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .smartstay-page-wrapper .pg-card-modern:hover,
        .smartstay-page-wrapper .card.pg-card-modern:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 30px 60px -12px rgba(99, 102, 241, 0.22), 0 18px 36px -18px rgba(0, 0, 0, 0.08) !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
        }

        .smartstay-page-wrapper .card-img-container {
          position: relative !important;
          height: 220px !important;
          overflow: hidden !important;
          background: #e2e8f0 !important;
        }

        .smartstay-page-wrapper .pg-card-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
        }

        .smartstay-page-wrapper .pg-card-modern:hover .pg-card-img {
          transform: scale(1.08) !important;
        }

        .smartstay-page-wrapper .card-img-overlay-top {
          position: absolute !important;
          top: 14px !important;
          left: 14px !important;
          right: 14px !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          z-index: 2 !important;
        }

        .smartstay-page-wrapper .badge-group {
          display: flex !important;
          gap: 6px !important;
        }

        .smartstay-page-wrapper .badge-verified {
          background: rgba(15, 23, 42, 0.7) !important;
          backdrop-filter: blur(8px) !important;
          color: white !important;
          font-size: 0.72rem !important;
          font-weight: 700 !important;
          padding: 4px 10px !important;
          border-radius: 20px !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
        }

        .smartstay-page-wrapper .badge-popular {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
          color: white !important;
          font-size: 0.72rem !important;
          font-weight: 700 !important;
          padding: 4px 10px !important;
          border-radius: 20px !important;
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3) !important;
        }

        .smartstay-page-wrapper .fav-btn {
          width: 34px !important;
          height: 34px !important;
          border-radius: 50% !important;
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(8px) !important;
          border: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #64748b !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important;
        }

        .smartstay-page-wrapper .fav-btn:hover {
          background: white !important;
          color: #ef4444 !important;
          transform: scale(1.1) !important;
        }

        .smartstay-page-wrapper .fav-btn.active {
          background: rgba(239, 68, 68, 0.9) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3) !important;
        }

        .smartstay-page-wrapper .card-img-overlay-bottom {
          position: absolute !important;
          bottom: 14px !important;
          left: 14px !important;
          right: 14px !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: flex-end !important;
          z-index: 2 !important;
        }

        .smartstay-page-wrapper .rating-badge {
          background: rgba(15, 23, 42, 0.75) !important;
          backdrop-filter: blur(8px) !important;
          color: white !important;
          padding: 4px 10px !important;
          border-radius: 12px !important;
          font-size: 0.8rem !important;
          font-weight: 700 !important;
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
        }

        .smartstay-page-wrapper .rent-tag {
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%) !important;
          color: white !important;
          padding: 5px 14px !important;
          border-radius: 20px !important;
          font-size: 0.88rem !important;
          font-weight: 800 !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35) !important;
        }

        .smartstay-page-wrapper .card-body-custom {
          padding: 22px !important;
          display: flex !important;
          flex-direction: column !important;
          flex-grow: 1 !important;
        }

        .smartstay-page-wrapper .pg-header-row {
          display: flex !important;
          justify-content: space-between !important;
          align-items: flex-start !important;
          margin-bottom: 8px !important;
        }

        .smartstay-page-wrapper .pg-title {
          font-size: 1.18rem !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          margin: 0 !important;
          line-height: 1.3 !important;
        }

        .smartstay-page-wrapper .gender-badge {
          font-size: 0.72rem !important;
          font-weight: 700 !important;
          color: #64748b !important;
          background: #f1f5f9 !important;
          padding: 3px 8px !important;
          border-radius: 6px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.03em !important;
        }

        .smartstay-page-wrapper .location-info {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          font-size: 0.88rem !important;
          color: #64748b !important;
          margin-bottom: 14px !important;
        }

        .smartstay-page-wrapper .location-city {
          color: #0f172a !important;
          font-weight: 700 !important;
        }

        .smartstay-page-wrapper .amenities-row {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 6px !important;
          margin-bottom: 20px !important;
        }

        .smartstay-page-wrapper .amenity-chip {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #475569 !important;
          font-size: 0.75rem !important;
          font-weight: 600 !important;
          padding: 3px 10px !important;
          border-radius: 8px !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
        }

        .smartstay-page-wrapper .btn-card-action,
        .smartstay-page-wrapper .btn-primary.btn-card-action {
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%) !important;
          color: white !important;
          border: none !important;
          border-radius: 14px !important;
          padding: 12px !important;
          font-weight: 700 !important;
          font-size: 0.95rem !important;
          text-align: center !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.25) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          text-decoration: none !important;
          margin-top: auto !important;
        }

        .smartstay-page-wrapper .btn-card-action:hover,
        .smartstay-page-wrapper .btn-primary.btn-card-action:hover {
          background: linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%) !important;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4) !important;
          transform: translateY(-2px) !important;
        }

        /* SKELETON LOADER */
        .smartstay-page-wrapper .skeleton-card {
          border-radius: 24px !important;
          background: #ffffff !important;
          border: 1px solid #f1f5f9 !important;
          overflow: hidden !important;
          height: 420px !important;
          padding: 0 !important;
          box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08) !important;
        }

        .smartstay-page-wrapper .skeleton-img {
          height: 220px !important;
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%) !important;
          background-size: 200% 100% !important;
          animation: shimmer 1.5s infinite !important;
        }

        .smartstay-page-wrapper .skeleton-body {
          padding: 22px !important;
        }

        .smartstay-page-wrapper .skeleton-line {
          height: 16px !important;
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%) !important;
          background-size: 200% 100% !important;
          animation: shimmer 1.5s infinite !important;
          border-radius: 8px !important;
          margin-bottom: 12px !important;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* EMPTY STATE */
        .smartstay-page-wrapper .empty-state-card {
          background: white !important;
          border-radius: 24px !important;
          padding: 60px 20px !important;
          text-align: center !important;
          box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08) !important;
          border: 1px solid #f1f5f9 !important;
          max-width: 500px !important;
          margin: 40px auto !important;
        }

        .smartstay-page-wrapper .empty-icon-circle {
          width: 80px !important;
          height: 80px !important;
          background: #eef2ff !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 auto 20px !important;
          color: #6366f1 !important;
          font-size: 2rem !important;
        }

        /* 1. WHY CHOOSE SMARTSTAY FEATURE CARDS */
        .smartstay-page-wrapper .feature-card {
          background: #ffffff !important;
          border: 1px solid #f1f5f9 !important;
          border-radius: 24px !important;
          padding: 32px 24px !important;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04) !important;
          transition: all 0.35s ease !important;
          height: 100% !important;
        }

        .smartstay-page-wrapper .feature-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.18) !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
        }

        .smartstay-page-wrapper .feature-icon-box {
          width: 56px !important;
          height: 56px !important;
          border-radius: 16px !important;
          background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%) !important;
          color: #6366f1 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-bottom: 20px !important;
        }

        .smartstay-page-wrapper .feature-title {
          font-size: 1.2rem !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          margin-bottom: 10px !important;
        }

        .smartstay-page-wrapper .feature-desc {
          color: #64748b !important;
          font-size: 0.92rem !important;
          line-height: 1.6 !important;
          margin: 0 !important;
        }

        /* 2. POPULAR CITIES GRID */
        .smartstay-page-wrapper .city-card {
          position: relative !important;
          height: 200px !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.12) !important;
          transition: all 0.35s ease !important;
          cursor: pointer !important;
          display: block !important;
          text-decoration: none !important;
        }

        .smartstay-page-wrapper .city-card:hover {
          transform: translateY(-5px) scale(1.02) !important;
          box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.25) !important;
        }

        .smartstay-page-wrapper .city-card-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.6s ease !important;
        }

        .smartstay-page-wrapper .city-card:hover .city-card-img {
          transform: scale(1.1) !important;
        }

        .smartstay-page-wrapper .city-card-overlay {
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%) !important;
          padding: 20px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-end !important;
          color: white !important;
        }

        .smartstay-page-wrapper .city-name {
          font-size: 1.25rem !important;
          font-weight: 800 !important;
          margin: 0 !important;
        }

        .smartstay-page-wrapper .city-stays {
          font-size: 0.82rem !important;
          color: rgba(255, 255, 255, 0.8) !important;
          font-weight: 600 !important;
        }

        /* 3. HOW IT WORKS STEPS */
        .smartstay-page-wrapper .step-card {
          background: #ffffff !important;
          border-radius: 24px !important;
          padding: 32px 24px !important;
          border: 1px solid #f1f5f9 !important;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04) !important;
          position: relative !important;
          text-align: center !important;
          transition: all 0.3s ease !important;
          height: 100% !important;
        }

        .smartstay-page-wrapper .step-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.2) !important;
        }

        .smartstay-page-wrapper .step-number-badge {
          position: absolute !important;
          top: -16px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 36px !important;
          height: 36px !important;
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%) !important;
          color: white !important;
          border-radius: 50% !important;
          font-weight: 800 !important;
          font-size: 0.95rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4) !important;
        }

        .smartstay-page-wrapper .step-icon {
          width: 60px !important;
          height: 60px !important;
          margin: 10px auto 20px !important;
          background: #f8fafc !important;
          border-radius: 20px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #6366f1 !important;
        }

        /* 4. AMENITIES GRID */
        .smartstay-page-wrapper .amenities-grid-item {
          background: #ffffff !important;
          border: 1px solid #f1f5f9 !important;
          border-radius: 20px !important;
          padding: 24px 16px !important;
          text-align: center !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.03) !important;
        }

        .smartstay-page-wrapper .amenities-grid-item:hover {
          transform: translateY(-4px) !important;
          background: #ffffff !important;
          border-color: #6366f1 !important;
          box-shadow: 0 16px 32px -8px rgba(99, 102, 241, 0.2) !important;
        }

        .smartstay-page-wrapper .amenity-grid-icon {
          width: 48px !important;
          height: 48px !important;
          background: #eef2ff !important;
          border-radius: 14px !important;
          color: #6366f1 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 auto 12px !important;
        }

        .smartstay-page-wrapper .amenity-grid-title {
          font-size: 0.95rem !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 0 !important;
        }

        /* 5. WHY STUDENTS LOVE US / STATS BANNER */
        .smartstay-page-wrapper .stats-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%) !important;
          border-radius: 32px !important;
          padding: 60px 40px !important;
          color: white !important;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.3) !important;
          margin-top: 80px !important;
          position: relative !important;
          overflow: hidden !important;
        }

        .smartstay-page-wrapper .stat-card-box {
          background: rgba(255, 255, 255, 0.06) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 20px !important;
          padding: 24px !important;
          text-align: center !important;
        }

        .smartstay-page-wrapper .stat-card-box h3 {
          font-size: 2.4rem !important;
          font-weight: 800 !important;
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          margin-bottom: 4px !important;
        }

        .smartstay-page-wrapper .stat-card-box p {
          color: #94a3b8 !important;
          font-size: 0.9rem !important;
          font-weight: 600 !important;
          margin: 0 !important;
        }

        /* 6. TESTIMONIAL CARDS */
        .smartstay-page-wrapper .testimonial-card {
          background: #ffffff !important;
          border-radius: 24px !important;
          padding: 32px 24px !important;
          border: 1px solid #f1f5f9 !important;
          box-shadow: 0 12px 32px -10px rgba(0, 0, 0, 0.05) !important;
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
          transition: all 0.3s ease !important;
        }

        .smartstay-page-wrapper .testimonial-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.2) !important;
        }

        .smartstay-page-wrapper .user-profile-row {
          display: flex !important;
          align-items: center !important;
          gap: 14px !important;
          margin-bottom: 16px !important;
        }

        .smartstay-page-wrapper .user-avatar {
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          object-fit: cover !important;
          border: 2px solid #6366f1 !important;
        }

        .smartstay-page-wrapper .review-quote {
          font-size: 0.94rem !important;
          color: #475569 !important;
          line-height: 1.6 !important;
          font-style: italic !important;
          margin-bottom: 20px !important;
          flex-grow: 1 !important;
        }

        /* 7. FAQ ACCORDION */
        .smartstay-page-wrapper .faq-container {
          max-width: 800px !important;
          margin: 0 auto !important;
        }

        .smartstay-page-wrapper .faq-item {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 20px !important;
          margin-bottom: 16px !important;
          overflow: hidden !important;
          transition: all 0.3s ease !important;
        }

        .smartstay-page-wrapper .faq-header {
          padding: 22px 28px !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          cursor: pointer !important;
          font-weight: 700 !important;
          font-size: 1.05rem !important;
          color: #0f172a !important;
          user-select: none !important;
        }

        .smartstay-page-wrapper .faq-header:hover {
          color: #6366f1 !important;
        }

        .smartstay-page-wrapper .faq-body {
          padding: 0 28px 24px 28px !important;
          color: #64748b !important;
          font-size: 0.95rem !important;
          line-height: 1.65 !important;
          border-top: 1px solid #f1f5f9 !important;
          padding-top: 16px !important;
        }

        .smartstay-page-wrapper .faq-chevron {
          transition: transform 0.3s ease !important;
        }

        .smartstay-page-wrapper .faq-chevron.open {
          transform: rotate(180deg) !important;
          color: #6366f1 !important;
        }

        /* 8. FINAL CTA BANNER */
        .smartstay-page-wrapper .cta-banner {
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #4f46e5 100%) !important;
          border-radius: 32px !important;
          padding: 70px 40px !important;
          text-align: center !important;
          color: white !important;
          box-shadow: 0 25px 50px -10px rgba(99, 102, 241, 0.35) !important;
          margin-top: 90px !important;
          position: relative !important;
          overflow: hidden !important;
        }

        .smartstay-page-wrapper .cta-title {
          font-size: 2.8rem !important;
          font-weight: 800 !important;
          margin-bottom: 16px !important;
        }

        .smartstay-page-wrapper .cta-desc {
          font-size: 1.1rem !important;
          color: rgba(255, 255, 255, 0.9) !important;
          max-width: 600px !important;
          margin: 0 auto 36px !important;
        }

        .smartstay-page-wrapper .btn-cta-white {
          background: #ffffff !important;
          color: #4f46e5 !important;
          font-weight: 800 !important;
          font-size: 1.05rem !important;
          padding: 14px 36px !important;
          border-radius: 30px !important;
          border: none !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 10px !important;
          text-decoration: none !important;
        }

        .smartstay-page-wrapper .btn-cta-white:hover {
          transform: translateY(-3px) scale(1.03) !important;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25) !important;
          color: #4f46e5 !important;
        }

        /* 9. FOOTER */
        .smartstay-page-wrapper .smartstay-footer {
          background: #ffffff !important;
          border-top: 1px solid #e2e8f0 !important;
          padding: 80px 0 30px !important;
          margin-top: 100px !important;
        }

        .smartstay-page-wrapper .footer-brand-desc {
          color: #64748b !important;
          font-size: 0.92rem !important;
          line-height: 1.6 !important;
          margin-top: 14px !important;
          max-width: 320px !important;
        }

        .smartstay-page-wrapper .footer-heading {
          font-size: 0.85rem !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          margin-bottom: 20px !important;
        }

        .smartstay-page-wrapper .footer-links {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .smartstay-page-wrapper .footer-links li {
          margin-bottom: 12px !important;
        }

        .smartstay-page-wrapper .footer-links a {
          color: #64748b !important;
          text-decoration: none !important;
          font-size: 0.92rem !important;
          font-weight: 500 !important;
          transition: color 0.2s ease !important;
        }

        .smartstay-page-wrapper .footer-links a:hover {
          color: #6366f1 !important;
        }

        .smartstay-page-wrapper .social-icon-btn {
          width: 38px !important;
          height: 38px !important;
          border-radius: 50% !important;
          background: #f1f5f9 !important;
          color: #475569 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-right: 8px !important;
          transition: all 0.2s ease !important;
          text-decoration: none !important;
        }

        .smartstay-page-wrapper .social-icon-btn:hover {
          background: #eef2ff !important;
          color: #6366f1 !important;
          transform: translateY(-2px) !important;
        }

        .smartstay-page-wrapper .footer-bottom {
          border-top: 1px solid #f1f5f9 !important;
          padding-top: 24px !important;
          margin-top: 60px !important;
          text-align: center !important;
          color: #94a3b8 !important;
          font-size: 0.88rem !important;
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 991px) {
          .smartstay-page-wrapper .hero-title {
            font-size: 2.75rem !important;
          }
          .smartstay-page-wrapper .cta-title {
            font-size: 2.2rem !important;
          }
        }

        @media (max-width: 576px) {
          .smartstay-page-wrapper .hero-title {
            font-size: 2.2rem !important;
          }
          .smartstay-page-wrapper .hero-search-box {
            flex-direction: column !important;
            padding: 12px !important;
            border-radius: 24px !important;
          }
          .smartstay-page-wrapper .hero-search-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .smartstay-page-wrapper .hero-stats {
            flex-direction: row !important;
            justify-content: space-between !important;
            gap: 16px !important;
          }
          .smartstay-page-wrapper .floating-thumb-top-right,
          .smartstay-page-wrapper .floating-thumb-bottom-left {
            display: none !important;
          }
          .smartstay-page-wrapper .stats-banner {
            padding: 40px 20px !important;
          }
        }
    `;

    return (
        <div className="smartstay-page-wrapper">
            {/* Embedded Inline Safe CSS - Zero Babel template literal issues */}
            <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />

            {/* Sticky Glassmorphism Navbar */}
            <nav className="smartstay-navbar navbar navbar-expand-lg px-4 py-3">
                <div className="container">
                    <a className="brand-logo" href="#">
                        <div className="brand-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        SmartStay
                    </a>

                    <div className="d-none d-md:flex align-items-center gap-4 ms-auto me-4">
                        <a href="#why-choose" className="nav-link-custom">Why Us</a>
                        <a href="#popular-cities" className="nav-link-custom">Cities</a>
                        <a href="#how-it-works" className="nav-link-custom">How It Works</a>
                        <a href="#amenities" className="nav-link-custom">Amenities</a>
                        <a href="#faq" className="nav-link-custom">FAQs</a>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        {/* Login As Multi-Role Dropdown */}
                        <div className="position-relative me-2">
                            <button 
                                className="btn-login-dropdown" 
                                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                                type="button"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                <span>Login As</span>
                                <svg 
                                    width="14" 
                                    height="14" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    style={{ transform: isLoginDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                                >
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>

                            {isLoginDropdownOpen && (
                                <div className="login-dropdown-menu">
                                    <div className="dropdown-header-custom">Select Account Type</div>
                                    
                                    <Link to="/login" className="login-dropdown-item" onClick={() => setIsLoginDropdownOpen(false)}>
                                        <span className="dropdown-icon-badge user-bg">👤</span>
                                        <div>
                                            <div className="dropdown-title">User Login</div>
                                            
                                        </div>
                                    </Link>

                                    <Link to="/owner/login" className="login-dropdown-item" onClick={() => setIsLoginDropdownOpen(false)}>
                                        <span className="dropdown-icon-badge owner-bg">🏠</span>
                                        <div>
                                            <div className="dropdown-title">Owner Login</div>
                                            
                                        </div>
                                    </Link>

                                    <Link to="/admin/login" className="login-dropdown-item" onClick={() => setIsLoginDropdownOpen(false)}>
                                        <span className="dropdown-icon-badge admin-bg">🛡️</span>
                                        <div>
                                            <div className="dropdown-title">Admin Login</div>
                                            
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <a href="#" className="btn-gradient-primary">
                            List your PG
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Left Hero Content */}
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="hero-pill-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                12,000+ verified stays across India
                            </div>

                            <h1 className="hero-title">
                                Find Your <span className="text-gradient">Dream PG</span> Across India
                            </h1>

                            <p className="hero-subtitle">
                                Discover verified PG accommodations for boys and girls with affordable rent, great amenities and trusted ratings.
                            </p>

                          
                            {/* Hero Stats */}
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <h4>12K+</h4>
                                    <p>Verified PGs</p>
                                </div>
                                <div className="stat-item">
                                    <h4>45+</h4>
                                    <p>Indian cities</p>
                                </div>
                                <div className="stat-item">
                                    <h4>4.8★</h4>
                                    <p>Avg. rating</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Hero Image Layout */}
                        <div className="col-lg-6">
                            <div className="hero-image-wrapper">
                                {/* Floating Top Badge */}
                                <div className="floating-badge-top">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                    <span><strong>100% Verified</strong> &bull; Visited by our team</span>
                                </div>

                                {/* Floating Top Right Thumbnail Card */}
                                <div className="floating-thumb-top-right">
                                    <img
                                        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80"
                                        alt="Cozy room"
                                        className="floating-thumb-img"
                                    />
                                </div>

                                {/* Main Bedroom Image */}
                                <div className="hero-main-card">
                                    <img
                                        src="https://images.unsplash.com/photo-1540518614846-7ede433c5163?auto=format&fit=crop&w=800&q=80"
                                        alt="Luxury PG Accommodation"
                                        className="hero-main-img"
                                    />
                                </div>

                                {/* Floating Bottom Left Thumbnail Card */}
                                <div className="floating-thumb-bottom-left">
                                    <img
                                        src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80"
                                        alt="Stay Interior"
                                        className="floating-thumb-img"
                                    />
                                </div>

                                {/* Floating Rating Badge Bottom */}
                                <div className="floating-rating-bottom">
                                    <span className="rating-star-icon">★</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#0f172a" }}>4.8 average</div>
                                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>from 8,400 reviews</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Container: Recommended PGs */}
            <div className="container mt-4">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Recommended PGs</h2>
                        <p className="section-subtitle">Hand-picked stays with the best rent-to-comfort ratio.</p>
                    </div>
                    <span className="updated-badge d-none d-sm-inline-block">Updated daily</span>
                </div>

                {/* Loading State Skeleton / Content Grid */}
                {loading ? (
                    <div className="row">
                        {[1, 2, 3].map((n) => (
                            <div className="col-md-4 mb-4" key={n}>
                                <div className="skeleton-card">
                                    <div className="skeleton-img"></div>
                                    <div className="skeleton-body">
                                        <div className="skeleton-line" style={{ width: "70%" }}></div>
                                        <div className="skeleton-line" style={{ width: "40%" }}></div>
                                        <div className="skeleton-line" style={{ width: "90%" }}></div>
                                        <div className="skeleton-line" style={{ width: "50%" }}></div>
                                        <div className="skeleton-line" style={{ width: "100%", height: "42px", marginTop: "20px" }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="row">
                        {pgs.length > 0 ? (
                            pgs.map((pg, index) => {
                                const cardImg = pg.imageUrl
    ? `http://localhost:8080/uploads/${pg.imageUrl}`
    : "https://via.placeholder.com/500x300?text=No+Image";

                                return (
                                    <div className="col-md-4 mb-4" key={pg.pgId}>
                                        <div className="card h-100 shadow pg-card-modern">

                                            {/* Card Image Header with Overlays */}
                                            <div className="card-img-container">
                                               <img
    src={cardImg}
    alt={pg.pgName}
    className="pg-card-img"
    onError={(e) => {
        e.target.src =
            "https://via.placeholder.com/500x300?text=No+Image";
    }}
/>

                                                <div className="card-img-overlay-top">
                                                    <div className="badge-group">
                                                        <span className="badge-verified">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                            Verified
                                                        </span>
                                                        <span className="badge-popular">Popular</span>
                                                    </div>

                                                   <button
    className={`fav-btn ${isWishlisted(pg.pgId) ? "active" : ""}`}
    onClick={() => toggleWishlist(pg.pgId)}
>
    ❤️
</button>
                                                </div>

                                                <div className="card-img-overlay-bottom">
                                                    <div className="rating-badge">
                                                        <span style={{ color: "#f59e0b" }}>⭐</span> {pg.rating}
                                                    </div>

                                                    <div className="rent-tag">
                                                        ₹{pg.rentStarting} <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>/mo</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="card-body card-body-custom">

                                                <div className="pg-header-row">
                                                    <h5 className="pg-title">{pg.pgName}</h5>
                                                    <span className="gender-badge">{pg.genderType || "Unisex"}</span>
                                                </div>

                                                <div className="location-info">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                        <circle cx="12" cy="10" r="3" />
                                                    </svg>
                                                    <span className="location-city">{pg.city}</span>
                                                    <span>&bull;</span>
                                                    <span className="text-truncate" style={{ maxWidth: "160px" }}>{pg.address}</span>
                                                </div>


                                                {/* Preserved Exact Link Component & Route */}
                                                <Link
                                                    to={`/pg/${pg.pgId}`}
                                                    className="btn btn-primary w-100 btn-card-action"
                                                >
                                                    <span>View Details</span>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="5" y1="12" x2="19" y2="12" />
                                                        <polyline points="12 5 19 12 12 19" />
                                                    </svg>
                                                </Link>

                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-12">
                                <div className="empty-state-card">
                                    <div className="empty-icon-circle">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                    </div>
                                    <h4 style={{ fontWeight: 800, color: "#0f172a" }}>No PG Found</h4>
                                    <p style={{ color: "#64748b", margin: 0 }}>We couldn't find any PG matching your criteria. Check back soon!</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 1. SECTION: WHY CHOOSE SMARTSTAY */}
            <section id="why-choose" className="container">
                <div className="section-header text-center d-block">
                    <h2 className="section-title">Why Choose SmartStay?</h2>
                    <p className="section-subtitle">Experience a new standard of co-living with maximum comfort and zero compromises.</p>
                </div>

                <div className="row gy-4">
                    <div className="col-md-3 col-sm-6">
                        <div className="feature-card">
                            <div className="feature-icon-box">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <h5 className="feature-title">Verified PGs</h5>
                            <p className="feature-desc">100% physically audited properties with verified food, hygiene, and room photos.</p>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="feature-card">
                            <div className="feature-icon-box">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="5" width="20" height="14" rx="2" />
                                    <line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                            </div>
                            <h5 className="feature-title">Affordable Rent</h5>
                            <p className="feature-desc">Zero brokerage fees with complete deposit transparency and no hidden charges.</p>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="feature-card">
                            <div className="feature-icon-box">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <h5 className="feature-title">Safe & Secure</h5>
                            <p className="feature-desc">24/7 CCTV surveillance, biometric access, and round-the-clock security personnel.</p>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="feature-card">
                            <div className="feature-icon-box">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <h5 className="feature-title">Easy Booking</h5>
                            <p className="feature-desc">Reserve your room online with instant digital documentation and move-in support.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SECTION: HOW SMARTSTAY WORKS */}
            <section id="how-it-works" className="container">
                <div className="section-header text-center d-block">
                    <h2 className="section-title">How SmartStay Works</h2>
                    <p className="section-subtitle">Four simple steps to find and move into your dream PG accommodation.</p>
                </div>

                <div className="row gy-4">
                    <div className="col-md-3 col-sm-6">
                        <div className="step-card">
                            <div className="step-number-badge">1</div>
                            <div className="step-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                            <h5 style={{ fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>1. Search</h5>
                            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>Browse verified PGs filtered by city, rent range, gender type, and amenities.</p>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="step-card">
                            <div className="step-number-badge">2</div>
                            <div className="step-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="20" x2="18" y2="10" />
                                    <line x1="12" y1="20" x2="12" y2="4" />
                                    <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                            </div>
                            <h5 style={{ fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>2. Compare</h5>
                            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>Review high-res room photos, food menus, verified ratings, and rental plans.</p>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="step-card">
                            <div className="step-number-badge">3</div>
                            <div className="step-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <h5 style={{ fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>3. Visit</h5>
                            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>Schedule a free physical property tour or live video walkthrough anytime.</p>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                        <div className="step-card">
                            <div className="step-number-badge">4</div>
                            <div className="step-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            <h5 style={{ fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>4. Move In</h5>
                            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>Sign digital agreement online and move into your comfortable new stay hassle-free!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SECTION: AMENITIES */}
            <section id="amenities" className="container">
                <div className="section-header text-center d-block">
                    <h2 className="section-title">Premium Amenities Included</h2>
                    <p className="section-subtitle">Everything you need for a comfortable modern lifestyle under one roof.</p>
                </div>

                <div className="row g-3">
                    {[
                        { title: "High-Speed WiFi", icon: "🌐" },
                        { title: "Air Conditioning", icon: "❄️" },
                        { title: "Laundry Service", icon: "🧺" },
                        { title: "Home-Style Meals", icon: "🍱" },
                        { title: "24/7 Parking", icon: "🚗" },
                        { title: "CCTV Security", icon: "📹" },
                        { title: "Daily Housekeeping", icon: "🧹" },
                        { title: "Power Backup", icon: "⚡" },
                        { title: "Fitness Gym", icon: "🏋️‍♂️" },
                        { title: "Study Zones", icon: "📚" }
                    ].map((item, idx) => (
                        <div className="col-lg-2 col-md-3 col-6" key={idx}>
                            <div className="amenities-grid-item">
                                <div className="amenity-grid-icon">{item.icon}</div>
                                <h6 className="amenity-grid-title">{item.title}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. SECTION: WHY STUDENTS LOVE US / STATS */}
            <section className="container">
                <div className="stats-banner">
                    <div className="text-center mb-5">
                        <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "white", marginBottom: "10px" }}>
                            Trusted by 50,000+ Students & Professionals
                        </h2>
                        <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto" }}>
                            We are transforming India's rental stay ecosystem with transparency, safety, and unmatched hospitality.
                        </p>
                    </div>

                    <div className="row gy-4">
                        <div className="col-md-3 col-6">
                            <div className="stat-card-box">
                                <h3>50K+</h3>
                                <p>Happy Residents</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="stat-card-box">
                                <h3>12K+</h3>
                                <p>Verified Stays</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="stat-card-box">
                                <h3>45+</h3>
                                <p>Top Indian Cities</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="stat-card-box">
                                <h3>4.8★</h3>
                                <p>Average Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. SECTION: FAQ ACCORDION */}
            <section id="faq" className="container">
                <div className="section-header text-center d-block">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">Got questions? We've got clear answers for you.</p>
                </div>

                <div className="faq-container">
                    {FAQ_ITEMS.map((faq, idx) => (
                        <div className="faq-item" key={idx}>
                            <div className="faq-header" onClick={() => toggleFaq(idx)}>
                                <span>{faq.q}</span>
                                <svg
                                    className={`faq-chevron ${activeFaq === idx ? "open" : ""}`}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                            {activeFaq === idx && (
                                <div className="faq-body">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 8. SECTION: FINAL CTA BANNER */}
            <section className="container">
                <div className="cta-banner">
                    <h2 className="cta-title">Find Your Perfect PG Today</h2>
                    <p className="cta-desc">
                        Join 50,000+ happy students and working professionals living in verified SmartStay accommodations across India.
                    </p>
                    <Link to="/find-pg" className="btn-cta-white">
                        <span>Explore Verified PGs Now</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* 9. SECTION: PREMIUM FOOTER */}
            <footer className="smartstay-footer">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-4 col-md-6">
                            <a className="brand-logo" href="#">
                                <div className="brand-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </div>
                                SmartStay
                            </a>
                            <p className="footer-brand-desc">
                                Find Your Perfect PG in Minutes &mdash; verified stays across India for students and working professionals.
                            </p>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h6 className="footer-heading">Quick Links</h6>
                            <ul className="footer-links">
                                <li><a href="#why-choose">Why Us</a></li>
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#amenities">Amenities</a></li>
                                <li><a href="#faq">FAQs</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <h6 className="footer-heading">Contact Us</h6>
                            <ul className="footer-links">
                                <li><a href="mailto:hello@smartstay.in">hello@smartstay.in</a></li>
                                <li><a href="tel:+919876543210">+91 8576897117</a></li>
                                <li><span style={{ color: "#64748b", fontSize: "0.9rem" }}>Noida, UP - 201309</span></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <h6 className="footer-heading">Follow Us</h6>
                            <div>
                                <a href="#" className="social-icon-btn" aria-label="Instagram">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon-btn" aria-label="Twitter">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon-btn" aria-label="LinkedIn">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        &copy; {new Date().getFullYear()} SmartStay. All rights reserved. Built for students and working professionals across India.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;