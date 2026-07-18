import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Navbar from "../components/Navbar";

import { getPgById } from "../services/pgService";
import { getRoomsByPgId } from "../services/roomService";
import { bookRoom } from "../services/bookingService";

import { useAuth } from "../context/AuthContext";

function PgDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();

    const [pg, setPg] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {

        try {

            const pgResponse = await getPgById(id);
            setPg(pgResponse.data);

            const roomResponse = await getRoomsByPgId(id);
            setRooms(roomResponse.data);

        } catch (error) {

            console.error("Error loading PG details:", error);

        } finally {

            setLoading(false);

        }
    };

    const handleBooking = async (room) => {

        if (!isAuthenticated) {

            alert("Please login to book a room.");

            navigate("/login");

            return;
        }

        try {

            const bookingData = {

                userId: user.userId,

                roomId: room.roomId,

                status: "CONFIRMED"

            };

            await bookRoom(bookingData);

            alert("Booking Successful!");

            navigate("/bookings");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Booking Failed"
            );
        }
    };

    if (loading) {

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '90vh' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <div style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link> /{' '}
          <Link to="/find-pg" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Stays</Link> /{' '}
          <span style={{ color: 'var(--text-primary)' }}>{property.title}</span>
        </div>

        {/* Gallery Showcase */}
        <div className="hover-zoom-img-container" style={{ height: '460px', borderRadius: '28px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', marginBottom: '48px', position: 'relative' }}>
          <button 
            onClick={() => setFavorite(!favorite)}
            style={{ position: 'absolute', top: '24px', right: '24px', width: '48px', height: '48px', borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-md)', zIndex: '3' }}
            aria-label="Add to favorites"
          >
            <span style={{ fontSize: '20px', color: favorite ? '#EF4444' : 'var(--text-secondary)' }}>
              {favorite ? '❤️' : '🤍'}
            </span>
          </button>
          <img src={property.image} alt="" />
        </div>

        {/* Main Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '64px' }}>
          {/* Left Column: Details */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <span className="section-tag">Premium Space</span>
              <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>{property.title}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📍 {property.location}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '24px 0', display: 'flex', gap: '40px', marginBottom: '32px' }}>
              <div>
                <strong style={{ fontSize: '20px', color: 'var(--primary-color)', display: 'block' }}>{property.rating} ★</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Rating</span>
              </div>
              <div>
                <strong style={{ fontSize: '20px', color: 'var(--primary-color)', display: 'block' }}>1 Month</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Deposit</span>
              </div>
              <div>
                <strong style={{ fontSize: '20px', color: 'var(--primary-color)', display: 'block' }}>Flexible</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Lease term</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>Overview</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
                {property.description}
              </p>
            </div>

            {/* Amenities Checklist */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Verified Amenities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {property.amenities.map((a, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
                    <span style={{ fontSize: '20px' }}>{a.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 style={{ fontSize: '22px', marginBottom: '24px' }}>Resident Reviews</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {property.reviews.map((rev, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '24px', borderRadius: '20px', background: '#FFFFFF' }}>
                    <p style={{ fontStyle: 'italic', color: 'var(--primary-color)', marginBottom: '16px', fontSize: '14px' }}>
                      "{rev.review}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={rev.avatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                      <div>
                        <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{rev.name}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{rev.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div>
            <div className="glass-panel" style={{ padding: '40px', borderRadius: '28px', background: '#FFFFFF', position: 'sticky', top: '120px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Rent starts at</span>
                  <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>{property.priceLabel}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>/month</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--accent-color)' }}>
                  ★ {property.rating}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '20px 0', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Lease Maintenance Fee</span>
                  <strong style={{ color: 'var(--text-primary)' }}>Included</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Consolidated Bills Portal</span>
                  <strong style={{ color: 'var(--text-primary)' }}>Free</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Security Deposit</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{property.priceLabel}</strong>
                </div>
              </div>

              <Link to="/booking" className="btn btn-accent" style={{ width: '100%', textDecoration: 'none' }}>
                Reserve This Stay
              </Link>
              
              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '16px' }}>
                ⚡ Reservation takes less than 5 minutes. No broker fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;
