package com.Project.SmartStay.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "owners")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "owner_id")
    private Long ownerId;

    @NotBlank(message = "Full Name is required")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Mobile Number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Mobile Number")
    @Column(name = "mobile_number", nullable = false, unique = true)
    private String mobileNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must contain at least 6 characters")
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private Boolean approved = false;

    public Owner() {
    }

    public Owner(Long ownerId, String fullName, String email,
                 String mobileNumber, String password,
                 LocalDateTime createdAt) {
        this.ownerId = ownerId;
        this.fullName = fullName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.password = password;
        this.createdAt = createdAt;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }
}