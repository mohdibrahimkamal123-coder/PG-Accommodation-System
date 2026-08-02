package com.Project.SmartStay.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingResponse {

    private Long bookingId;
    private String bookingNumber;
    private LocalDateTime bookingDate;
    private String status;

    // User Details
    private Long userId;
    private String userName;

    // Booking Details
    private LocalDate moveInDate;
    private Integer expectedStayMonths;
    private String emergencyContact;
    private String idProofType;
    private String idProofNumber;
    private String specialRequest;

    // Room Details
    private Long roomId;
    private String roomNumber;
    private String roomType;
    private Double rent;

    // PG Details
    private Long pgId;
    private String pgName;
    private String address;
    private String city;
    private String state;

    public BookingResponse() {
    }

    public BookingResponse(
            Long bookingId,
            String bookingNumber,
            LocalDateTime bookingDate,
            String status,

            Long userId,
            String userName,

            LocalDate moveInDate,
            Integer expectedStayMonths,
            String emergencyContact,
            String idProofType,
            String idProofNumber,
            String specialRequest,

            Long roomId,
            String roomNumber,
            String roomType,
            Double rent,

            Long pgId,
            String pgName,
            String address,
            String city,
            String state) {

        this.bookingId = bookingId;
        this.bookingNumber = bookingNumber;
        this.bookingDate = bookingDate;
        this.status = status;

        this.userId = userId;
        this.userName = userName;

        this.moveInDate = moveInDate;
        this.expectedStayMonths = expectedStayMonths;
        this.emergencyContact = emergencyContact;
        this.idProofType = idProofType;
        this.idProofNumber = idProofNumber;
        this.specialRequest = specialRequest;

        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.rent = rent;

        this.pgId = pgId;
        this.pgName = pgName;
        this.address = address;
        this.city = city;
        this.state = state;
    }

    // =============================
    // Getters and Setters
    // =============================

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Double getRent() {
        return rent;
    }

    public void setRent(Double rent) {
        this.rent = rent;
    }

    public Long getPgId() {
        return pgId;
    }

    public void setPgId(Long pgId) {
        this.pgId = pgId;
    }

    public String getPgName() {
        return pgName;
    }

    public void setPgName(String pgName) {
        this.pgName = pgName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}