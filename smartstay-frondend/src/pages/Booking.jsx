// src/pages/Booking.jsx

import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import Swal from "sweetalert2";
import { getPgById } from "../services/pgService";
import { bookRoom } from "../services/bookingService";
import { getRoomsByPgId } from "../services/roomService";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pg, setPg] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [expectedStayMonths, setExpectedStayMonths] = useState("1");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [idProofType, setIdProofType] = useState("AADHAAR");
  const [idProofNumber, setIdProofNumber] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    loadPg();
  }, [id]);

  const loadPg = async () => {
    setLoading(true);
    try {
      const [pgData, roomData] = await Promise.all([
        getPgById(id),
        getRoomsByPgId(id)
      ]);
      setPg(pgData);
      setRooms(roomData);
    } catch (error) {
      console.error("Error loading data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load PG details. Please try again.',
        confirmButtonColor: '#6366f1',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateField = (fieldName, value) => {
    const errors = {};

    switch (fieldName) {
      case 'selectedRoom':
        if (!value) {
          errors.selectedRoom = "Please select a room.";
        }
        break;

      case 'moveInDate':
        if (!value) {
          errors.moveInDate = "Please select a move-in date.";
        } else {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const selectedDate = new Date(value);
          if (selectedDate < today) {
            errors.moveInDate = "Move-in date cannot be in the past.";
          }
        }
        break;

      case 'expectedStayMonths':
        const stayMonths = Number(value);
        if (!value || isNaN(stayMonths) || stayMonths < 1 || stayMonths > 36) {
          errors.expectedStayMonths = "Stay duration must be between 1 and 36 months.";
        }
        break;

      case 'emergencyContact':
        if (!value) {
          errors.emergencyContact = "Emergency contact is required.";
        } else if (!/^[0-9]{10}$/.test(value)) {
          errors.emergencyContact = "Please enter a valid 10-digit phone number.";
        }
        break;

      case 'idProofNumber':
        if (!value) {
          errors.idProofNumber = "ID proof number is required.";
        } else if (value.length < 4) {
          errors.idProofNumber = "Please enter a valid ID proof number (minimum 4 characters).";
        }
        break;

      default:
        break;
    }

    return errors;
  };

  const validateForm = () => {
    const errors = {};
    const fieldValidations = [
      'selectedRoom',
      'moveInDate',
      'expectedStayMonths',
      'emergencyContact',
      'idProofNumber'
    ];

    fieldValidations.forEach(field => {
      let value;
      switch (field) {
        case 'selectedRoom':
          value = selectedRoom;
          break;
        case 'moveInDate':
          value = moveInDate;
          break;
        case 'expectedStayMonths':
          value = expectedStayMonths;
          break;
        case 'emergencyContact':
          value = emergencyContact;
          break;
        case 'idProofNumber':
          value = idProofNumber;
          break;
        default:
          value = '';
      }
      const fieldError = validateField(field, value);
      Object.assign(errors, fieldError);
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case 'selectedRoom':
        setSelectedRoom(value);
        break;
      case 'moveInDate':
        setMoveInDate(value);
        break;
      case 'expectedStayMonths':
        setExpectedStayMonths(value);
        break;
      case 'emergencyContact':
        setEmergencyContact(value);
        break;
      case 'idProofNumber':
        setIdProofNumber(value);
        break;
      case 'specialRequest':
        setSpecialRequest(value);
        break;
      default:
        break;
    }

    setTouched({ ...touched, [fieldName]: true });

    if (formErrors[fieldName]) {
      const newErrors = { ...formErrors };
      delete newErrors[fieldName];
      setFormErrors(newErrors);
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    
    let value;
    switch (fieldName) {
      case 'selectedRoom':
        value = selectedRoom;
        break;
      case 'moveInDate':
        value = moveInDate;
        break;
      case 'expectedStayMonths':
        value = expectedStayMonths;
        break;
      case 'emergencyContact':
        value = emergencyContact;
        break;
      case 'idProofNumber':
        value = idProofNumber;
        break;
      default:
        return;
    }

    const fieldError = validateField(fieldName, value);
    if (Object.keys(fieldError).length > 0) {
      setFormErrors({ ...formErrors, ...fieldError });
    }
  };

  const handleBooking = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to book a room',
        confirmButtonColor: '#6366f1',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Login Now',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    if (!validateForm()) {
      const firstErrorField = document.querySelector(".is-invalid");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Booking?',
      text: `Are you sure you want to book this room?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Book Now!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setSubmitting(true);
    try {
      const bookingData = {
        userId: user.userId,
        roomId: Number(selectedRoom),
        moveInDate,
        expectedStayMonths: Number(expectedStayMonths),
        emergencyContact,
        idProofType,
        idProofNumber,
        specialRequest: specialRequest.trim() || "None"
      };

      await bookRoom(bookingData);
      Swal.fire({
        icon: 'success',
        title: 'Booking Confirmed! 🎉',
        text: 'Your booking has been successfully confirmed',
        confirmButtonColor: '#6366f1',
        timer: 3000,
        timerProgressBar: true,
      });
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: error.response?.data?.message || 'Please try again.',
        confirmButtonColor: '#6366f1',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    * {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }

    .booking-content {
      padding: 25px 30px;
      background: #eef2f6;
      min-height: 100vh;
    }

    .booking-card {
      background: #ffffff;
      border-radius: 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.08);
      overflow: hidden;
    }

    .booking-card-header {
      background: #0f172a;
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .booking-card-header h3 {
      color: #ffffff;
      margin: 0;
      font-weight: 800;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .booking-card-body {
      padding: 32px;
    }

    .pg-summary {
      background: #f8fafc;
      border-radius: 16px;
      padding: 20px 24px;
      border: 1px solid #e2e8f0;
      margin-bottom: 24px;
    }

    .pg-summary h4 {
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 12px;
      font-size: 1.1rem;
    }

    .pg-summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @media (max-width: 640px) {
      .pg-summary-grid {
        grid-template-columns: 1fr;
      }
    }

    .pg-summary-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
    }

    .pg-summary-item .label {
      color: #64748b;
      font-weight: 500;
    }

    .pg-summary-item .value {
      color: #0f172a;
      font-weight: 600;
    }

    .amenities-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 700;
    }

    .amenities-tag.available {
      background: #dcfce7;
      color: #166534;
    }

    .amenities-tag.unavailable {
      background: #fee2e2;
      color: #991b1b;
    }

    .section-title {
      font-size: 1rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      font-size: 0.8rem;
      font-weight: 700;
      color: #475569;
      display: block;
      margin-bottom: 6px;
      letter-spacing: 0.02em;
    }

    .form-group label .required {
      color: #ef4444;
    }

    .form-group select,
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      font-size: 0.9rem;
      font-weight: 500;
      background: #f8fafc;
      color: #0f172a;
      transition: all 0.2s ease;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .form-group select:focus,
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #6366f1;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
    }

    .form-group select.is-invalid,
    .form-group input.is-invalid,
    .form-group textarea.is-invalid {
      border-color: #ef4444;
    }

    .form-group select.is-invalid:focus,
    .form-group input.is-invalid:focus,
    .form-group textarea.is-invalid:focus {
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
    }

    .form-group .invalid-feedback {
      color: #ef4444;
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 4px;
    }

    .form-group .help-text {
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 500;
      margin-top: 4px;
    }

    .form-group .char-count {
      text-align: right;
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 500;
      margin-top: 4px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 640px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }

    .booking-actions {
      display: flex;
      gap: 12px;
      margin-top: 28px;
      padding-top: 24px;
      border-top: 1px solid #f1f5f9;
      flex-wrap: wrap;
    }

    .btn-confirm {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 36px;
      background: #22c55e;
      color: #ffffff;
      border: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-confirm:hover:not(:disabled) {
      background: #16a34a;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
    }

    .btn-confirm:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .btn-cancel {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: #f1f5f9;
      color: #475569;
      border: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-cancel:hover:not(:disabled) {
      background: #e2e8f0;
      transform: translateY(-2px);
    }

    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e2e8f0;
      border-top: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-container {
      text-align: center;
      padding: 60px 20px;
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid #e2e8f0;
    }

    .error-container .icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .error-container h4 {
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 8px;
    }

    .error-container p {
      color: #94a3b8;
    }

    .no-rooms-warning {
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: 12px;
      padding: 16px 20px;
      color: #92400e;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    @media (max-width: 768px) {
      .booking-content {
        padding: 16px;
      }

      .booking-card-header {
        padding: 18px 20px;
      }

      .booking-card-header h3 {
        font-size: 1.1rem;
      }

      .booking-card-body {
        padding: 20px;
      }

      .booking-actions {
        flex-direction: column;
      }

      .btn-confirm, .btn-cancel {
        justify-content: center;
        width: 100%;
      }
    }
  `;

  if (loading) {
    return (
      <UserLayout>
        <div className="booking-content">
          <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (!pg) {
    return (
      <UserLayout>
        <div className="booking-content">
          <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
          <div className="error-container">
            <div className="icon">🏠</div>
            <h4>PG Not Found</h4>
            <p>The PG you're trying to book doesn't exist.</p>
            <button 
              className="btn-cancel"
              onClick={() => navigate("/")}
              style={{ display: 'inline-flex', marginTop: '12px' }}
            >
              ← Go Back Home
            </button>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      
      <div className="booking-content">
        <div className="booking-card">
          {/* Header */}
          <div className="booking-card-header">
            <h3>📋 Booking Confirmation</h3>
            <Link to={`/pg/${pg.pgId}`} className="btn-cancel" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
              ← Back to PG
            </Link>
          </div>

          <div className="booking-card-body">
            {/* PG Summary */}
            <div className="pg-summary">
              <h4>{pg.pgName}</h4>
              <div className="pg-summary-grid">
                <div className="pg-summary-item">
                  <span className="label">📍 Address:</span>
                  <span className="value">{pg.address}</span>
                </div>
                <div className="pg-summary-item">
                  <span className="label">🏙️ City:</span>
                  <span className="value">{pg.city}</span>
                </div>
                <div className="pg-summary-item">
                  <span className="label">💰 Rent:</span>
                  <span className="value" style={{ color: '#4f46e5', fontWeight: 800 }}>
                    ₹{pg.rentStarting?.toLocaleString()}
                  </span>
                </div>
                <div className="pg-summary-item" style={{ gap: '8px' }}>
                  <span className="label">🛠️ Amenities:</span>
                  <span className={`amenities-tag ${pg.foodAvailable ? 'available' : 'unavailable'}`}>
                    🍽️
                  </span>
                  <span className={`amenities-tag ${pg.wifiAvailable ? 'available' : 'unavailable'}`}>
                    📶
                  </span>
                  <span className={`amenities-tag ${pg.laundryAvailable ? 'available' : 'unavailable'}`}>
                    👕
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="section-title">📝 Booking Details</div>

            {/* Select Room */}
            <div className="form-group">
              <label>
                Select Room <span className="required">*</span>
              </label>
              <select
                className={formErrors.selectedRoom && touched.selectedRoom ? 'is-invalid' : ''}
                value={selectedRoom}
                onChange={(e) => handleFieldChange('selectedRoom', e.target.value)}
                onBlur={() => handleFieldBlur('selectedRoom')}
                disabled={submitting || rooms.length === 0}
              >
                <option value="">-- Select a Room --</option>
                {rooms.map((room) => (
                  <option
                    key={room.roomId}
                    value={room.roomId}
                    disabled={room.availableBeds === 0}
                  >
                    {room.roomNumber} - {room.roomType} - ₹{room.rent} 
                    ({room.availableBeds} bed{room.availableBeds !== 1 ? 's' : ''} left)
                  </option>
                ))}
              </select>
              {formErrors.selectedRoom && touched.selectedRoom && (
                <div className="invalid-feedback">{formErrors.selectedRoom}</div>
              )}
              {rooms.length === 0 && (
                <div className="no-rooms-warning">
                  ⚠️ No rooms available for this PG.
                </div>
              )}
            </div>

            <div className="form-row">
              {/* Move In Date */}
              <div className="form-group">
                <label>
                  Move-in Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className={formErrors.moveInDate && touched.moveInDate ? 'is-invalid' : ''}
                  value={moveInDate}
                  onChange={(e) => handleFieldChange('moveInDate', e.target.value)}
                  onBlur={() => handleFieldBlur('moveInDate')}
                  min={today}
                  disabled={submitting}
                />
                {formErrors.moveInDate && touched.moveInDate && (
                  <div className="invalid-feedback">{formErrors.moveInDate}</div>
                )}
              </div>

              {/* Expected Stay Duration */}
              <div className="form-group">
                <label>
                  Stay Duration (Months) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  className={formErrors.expectedStayMonths && touched.expectedStayMonths ? 'is-invalid' : ''}
                  value={expectedStayMonths}
                  onChange={(e) => handleFieldChange('expectedStayMonths', e.target.value)}
                  onBlur={() => handleFieldBlur('expectedStayMonths')}
                  min="1"
                  max="36"
                  disabled={submitting}
                />
                {formErrors.expectedStayMonths && touched.expectedStayMonths && (
                  <div className="invalid-feedback">{formErrors.expectedStayMonths}</div>
                )}
                <div className="help-text">Minimum 1 month, Maximum 36 months</div>
              </div>
            </div>

            <div className="form-row">
              {/* Emergency Contact */}
              <div className="form-group">
                <label>
                  Emergency Contact <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  className={formErrors.emergencyContact && touched.emergencyContact ? 'is-invalid' : ''}
                  placeholder="Enter 10-digit mobile number"
                  value={emergencyContact}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleFieldChange('emergencyContact', value);
                  }}
                  onBlur={() => handleFieldBlur('emergencyContact')}
                  disabled={submitting}
                />
                {formErrors.emergencyContact && touched.emergencyContact && (
                  <div className="invalid-feedback">{formErrors.emergencyContact}</div>
                )}
              </div>

              {/* ID Proof Type */}
              <div className="form-group">
                <label>ID Proof Type</label>
                <select
                  value={idProofType}
                  onChange={(e) => setIdProofType(e.target.value)}
                  disabled={submitting}
                >
                  <option value="AADHAAR">Aadhaar Card</option>
                  <option value="PAN">PAN Card</option>
                  <option value="VOTER_ID">Voter ID</option>
                  <option value="DRIVING_LICENSE">Driving License</option>
                  <option value="PASSPORT">Passport</option>
                </select>
              </div>
            </div>

            {/* ID Proof Number */}
            <div className="form-group">
              <label>
                ID Proof Number <span className="required">*</span>
              </label>
              <input
                type="text"
                className={formErrors.idProofNumber && touched.idProofNumber ? 'is-invalid' : ''}
                placeholder="Enter your ID proof number"
                value={idProofNumber}
                onChange={(e) => handleFieldChange('idProofNumber', e.target.value)}
                onBlur={() => handleFieldBlur('idProofNumber')}
                disabled={submitting}
              />
              {formErrors.idProofNumber && touched.idProofNumber && (
                <div className="invalid-feedback">{formErrors.idProofNumber}</div>
              )}
            </div>

            {/* Special Request */}
            <div className="form-group">
              <label>Special Request (Optional)</label>
              <textarea
                rows="3"
                placeholder="Any special requests? (e.g., dietary preferences, room preferences, etc.)"
                value={specialRequest}
                onChange={(e) => handleFieldChange('specialRequest', e.target.value)}
                disabled={submitting}
                maxLength="500"
              />
              <div className="char-count">{specialRequest.length}/500 characters</div>
            </div>

            {/* Actions */}
            <div className="booking-actions">
              <button
                className="btn-confirm"
                onClick={handleBooking}
                disabled={submitting || rooms.length === 0}
              >
                {submitting ? (
                  <>
                    <span className="loading-spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
                    Processing...
                  </>
                ) : (
                  '✅ Confirm Booking'
                )}
              </button>
              <button
                className="btn-cancel"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Booking;