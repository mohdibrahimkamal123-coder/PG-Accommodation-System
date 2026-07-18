package com.Project.SmartStay.dto;

public class AdminLoginResponse {

    private Long adminId;
    private String fullName;
    private String email;
    private String message;

    public AdminLoginResponse() {
    }

    public AdminLoginResponse(Long adminId,
                              String fullName,
                              String email,
                              String message) {

        this.adminId = adminId;
        this.fullName = fullName;
        this.email = email;
        this.message = message;
    }

    public Long getAdminId() {
        return adminId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

}