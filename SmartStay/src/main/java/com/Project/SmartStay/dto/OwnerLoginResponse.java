package com.Project.SmartStay.dto;

public class OwnerLoginResponse {

    private Long ownerId;
    private String ownerName;
    private String email;
    private String role;

    public OwnerLoginResponse(Long ownerId,
                              String ownerName,
                              String email,
                              String role) {
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.email = email;
        this.role = role;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}