package com.Project.SmartStay.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "booking_number", unique = true)
    private String bookingNumber;

    @NotNull(message = "User Id is required")
    @Column(name = "user_id")
    private Long userId;

    @NotNull(message = "Room Id is required")
    @Column(name = "room_id")
    private Long roomId;

    @NotNull(message = "Move In Date is required")
    @Column(name = "move_in_date")
    private LocalDate moveInDate;

    @NotNull(message = "Expected Stay is required")
    @Column(name = "expected_stay_months")
    private Integer expectedStayMonths;

    @NotBlank(message = "Emergency Contact is required")
    @Column(name = "emergency_contact")
    private String emergencyContact;

    @NotBlank(message = "ID Proof Type is required")
    @Column(name = "id_proof_type")
    private String idProofType;

    @NotBlank(message = "ID Proof Number is required")
    @Column(name = "id_proof_number")
    private String idProofNumber;

    @Column(name = "special_request")
    private String specialRequest;

    @Column(name = "booking_date", insertable = false, updatable = false)
    private LocalDateTime bookingDate;

    @Column(name = "status")
    private String status;

    public Booking() {
    }

    // --------------------------
    // Getters & Setters
    // --------------------------

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getBookingNumber() {
        return bookingNumber;
    }

    public void setBookingNumber(String bookingNumber) {
        this.bookingNumber = bookingNumber;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public LocalDate getMoveInDate() {
        return moveInDate;
    }

    public void setMoveInDate(LocalDate moveInDate) {
        this.moveInDate = moveInDate;
    }

    public Integer getExpectedStayMonths() {
        return expectedStayMonths;
    }

    public void setExpectedStayMonths(Integer expectedStayMonths) {
        this.expectedStayMonths = expectedStayMonths;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public String getIdProofType() {
        return idProofType;
    }

    public void setIdProofType(String idProofType) {
        this.idProofType = idProofType;
    }

    public String getIdProofNumber() {
        return idProofNumber;
    }

    public void setIdProofNumber(String idProofNumber) {
        this.idProofNumber = idProofNumber;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}