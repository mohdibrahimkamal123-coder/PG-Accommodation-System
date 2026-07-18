package com.Project.SmartStay.dto;

public class OwnerLoginResponse {

    private Long ownerId;
    private String fullName;
    private String email;
    private String mobileNumber;
    private String message;

    public OwnerLoginResponse() {
    }

    public OwnerLoginResponse(Long ownerId, String fullName, String email,
                              String mobileNumber, String message) {
        this.ownerId = ownerId;
        this.fullName = fullName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.message = message;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}