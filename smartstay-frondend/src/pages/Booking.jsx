import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
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
      console.log("PG Data:", pgData);
      console.log("Rooms:", roomData);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load PG details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Real-time validation for individual fields
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

  // Full form validation
  const validateForm = () => {
    const errors = {};

    // Validate all fields
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

  // Handle field change with validation
  const handleFieldChange = (fieldName, value) => {
    // Update state
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

    // Mark field as touched
    setTouched({ ...touched, [fieldName]: true });

    // Clear error for this field if it exists
    if (formErrors[fieldName]) {
      const newErrors = { ...formErrors };
      delete newErrors[fieldName];
      setFormErrors(newErrors);
    }
  };

  // Handle field blur
  const handleFieldBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    
    // Validate on blur
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
    // Check if user is logged in
    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector(".is-invalid");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
      return;
    }

    // Confirm booking
    if (!window.confirm("Are you sure you want to confirm this booking?")) {
      return;
    }

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
      alert("Booking Successful! 🎉");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Booking Failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get today's date for min date attribute
  const today = new Date().toISOString().split("T")[0];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (!pg) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-danger">
            <h4>PG Not Found</h4>
            <p>The PG you're trying to book doesn't exist.</p>
            <button 
              className="btn btn-secondary mt-2"
              onClick={() => navigate("/")}
            >
              Go Back Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">📋 Booking Confirmation</h3>
          </div>
          <div className="card-body">
            {/* PG Details */}
            <h4 className="text-primary">{pg.pgName}</h4>
            <hr />

            <div className="row">
              <div className="col-md-6">
                <p><strong>📍 Address:</strong> {pg.address}</p>
                <p><strong>🏙️ City:</strong> {pg.city}</p>
                <p><strong>💰 Rent:</strong> ₹{pg.rentStarting.toLocaleString()}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Amenities:</strong></p>
                <div className="d-flex gap-3 flex-wrap">
                  <span className={`badge ${pg.foodAvailable ? 'bg-success' : 'bg-secondary'}`}>
                    🍽️ Food {pg.foodAvailable ? '✅' : '❌'}
                  </span>
                  <span className={`badge ${pg.wifiAvailable ? 'bg-success' : 'bg-secondary'}`}>
                    📶 WiFi {pg.wifiAvailable ? '✅' : '❌'}
                  </span>
                  <span className={`badge ${pg.laundryAvailable ? 'bg-success' : 'bg-secondary'}`}>
                    👕 Laundry {pg.laundryAvailable ? '✅' : '❌'}
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {/* Booking Form */}
            <h5 className="mb-3">📝 Booking Details</h5>

            {/* Select Room */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Select Room <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${formErrors.selectedRoom && touched.selectedRoom ? 'is-invalid' : ''}`}
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
                <div className="text-warning mt-1">
                  ⚠️ No rooms available for this PG.
                </div>
              )}
            </div>

            {/* Move In Date */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Move-in Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control ${formErrors.moveInDate && touched.moveInDate ? 'is-invalid' : ''}`}
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
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Expected Stay Duration (Months) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${formErrors.expectedStayMonths && touched.expectedStayMonths ? 'is-invalid' : ''}`}
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
              <small className="text-muted">Minimum 1 month, Maximum 36 months</small>
            </div>

            {/* Emergency Contact */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Emergency Contact <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className={`form-control ${formErrors.emergencyContact && touched.emergencyContact ? 'is-invalid' : ''}`}
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
            <div className="mb-3">
              <label className="form-label fw-semibold">ID Proof Type</label>
              <select
                className="form-select"
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

            {/* ID Proof Number */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                ID Proof Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${formErrors.idProofNumber && touched.idProofNumber ? 'is-invalid' : ''}`}
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
            <div className="mb-3">
              <label className="form-label fw-semibold">Special Request (Optional)</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Any special requests? (e.g., dietary preferences, room preferences, etc.)"
                value={specialRequest}
                onChange={(e) => handleFieldChange('specialRequest', e.target.value)}
                disabled={submitting}
                maxLength="500"
              />
              <div className="text-end text-muted small">
                {specialRequest.length}/500 characters
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2 mt-4">
              <button
                className="btn btn-success"
                onClick={handleBooking}
                disabled={submitting || rooms.length === 0}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                  </>
                ) : (
                  '✅ Confirm Booking'
                )}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;