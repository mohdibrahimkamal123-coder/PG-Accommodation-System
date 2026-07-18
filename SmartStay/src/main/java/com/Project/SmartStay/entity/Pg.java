package com.Project.SmartStay.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "pgs")
public class Pg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pg_id")
    private Long pgId;

    @NotNull(message = "Owner Id is required")
    @Column(name = "owner_id")
    private Long ownerId;

    @NotBlank(message = "PG Name is required")
    @Column(name = "pg_name")
    private String pgName;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^[0-9]{6}$",
             message = "Pincode must contain exactly 6 digits")
    private String pincode;

    @NotNull(message = "Starting Rent is required")
    @Positive(message = "Starting Rent must be greater than 0")
    @Column(name = "rent_starting")
    private Double rentStarting;

    @NotNull(message = "Food Availability is required")
    @Column(name = "food_available")
    private Boolean foodAvailable;

    @NotNull(message = "WiFi Availability is required")
    @Column(name = "wifi_available")
    private Boolean wifiAvailable;
    @Column(nullable = false)
    private Boolean approved = false;

    @NotNull(message = "Laundry Availability is required")
    @Column(name = "laundry_available")
    
    
    private Boolean laundryAvailable;

    private Double rating;

    public Pg() {
    }

    public Long getPgId() {
        return pgId;
    }

    public void setPgId(Long pgId) {
        this.pgId = pgId;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getPgName() {
        return pgName;
    }

    public void setPgName(String pgName) {
        this.pgName = pgName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Double getRentStarting() {
        return rentStarting;
    }

    public void setRentStarting(Double rentStarting) {
        this.rentStarting = rentStarting;
    }

    public Boolean getFoodAvailable() {
        return foodAvailable;
    }

    public void setFoodAvailable(Boolean foodAvailable) {
        this.foodAvailable = foodAvailable;
    }

    public Boolean getWifiAvailable() {
        return wifiAvailable;
    }

    public void setWifiAvailable(Boolean wifiAvailable) {
        this.wifiAvailable = wifiAvailable;
    }

    public Boolean getLaundryAvailable() {
        return laundryAvailable;
    }

    public void setLaundryAvailable(Boolean laundryAvailable) {
        this.laundryAvailable = laundryAvailable;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }
}