package com.Project.SmartStay.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingResponse {

    private Long bookingId;
    private String bookingNumber;
    private LocalDateTime bookingDate;
    private String status;

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

    public BookingResponse(Long bookingId,
                           String bookingNumber,
                           LocalDateTime bookingDate,
                           String status,
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

    public Long getBookingId() {
        return bookingId;
    }

    public String getBookingNumber() {
        return bookingNumber;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public String getStatus() {
        return status;
    }

    public LocalDate getMoveInDate() {
        return moveInDate;
    }

    public Integer getExpectedStayMonths() {
        return expectedStayMonths;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public String getIdProofType() {
        return idProofType;
    }

    public String getIdProofNumber() {
        return idProofNumber;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public Long getRoomId() {
        return roomId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public Double getRent() {
        return rent;
    }

    public Long getPgId() {
        return pgId;
    }

    public String getPgName() {
        return pgName;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }
}