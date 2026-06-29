package com.Project.SmartStay.dto;

import java.time.LocalDateTime;

public class BookingResponse {

    private Long bookingId;

    private LocalDateTime bookingDate;

    private String status;

    private Long roomId;
    private String roomType;
    private Double rent;

    private Long pgId;
    private String pgName;
    private String address;
    private String city;
    private String state;

    public BookingResponse() {
    }

    public BookingResponse(Long bookingId,
                           LocalDateTime bookingDate,
                           String status,
                           Long roomId,
                           String roomType,
                           Double rent,
                           Long pgId,
                           String pgName,
                           String address,
                           String city,
                           String state) {

        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.status = status;
        this.roomId = roomId;
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

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public String getStatus() {
        return status;
    }

    public Long getRoomId() {
        return roomId;
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
