package com.Project.SmartStay.dto;

public class WishlistResponse {

    private Long wishlistId;
    private Long pgId;
    private String pgName;
    private String city;
    private Double rentStarting;
    private Double rating;

    public WishlistResponse() {
    }

    public WishlistResponse(Long wishlistId, Long pgId, String pgName,
                            String city, Double rentStarting, Double rating) {

        this.wishlistId = wishlistId;
        this.pgId = pgId;
        this.pgName = pgName;
        this.city = city;
        this.rentStarting = rentStarting;
        this.rating = rating;
    }

    public Long getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(Long wishlistId) {
        this.wishlistId = wishlistId;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getRentStarting() {
        return rentStarting;
    }

    public void setRentStarting(Double rentStarting) {
        this.rentStarting = rentStarting;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}