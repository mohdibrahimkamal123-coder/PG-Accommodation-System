package com.Project.SmartStay.dto;

import jakarta.validation.constraints.NotBlank;

public class BookingStatusUpdateRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public BookingStatusUpdateRequest() {
    }

    public BookingStatusUpdateRequest(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}