package com.Project.SmartStay.dto;

public class ReportResponse {

    private Long totalUsers;
    private Long totalOwners;
    private Long totalPgs;
    private Long totalRooms;
    private Long totalBookings;
    private Long totalReviews;

    public ReportResponse() {
    }

    public ReportResponse(Long totalUsers,
                          Long totalOwners,
                          Long totalPgs,
                          Long totalRooms,
                          Long totalBookings,
                          Long totalReviews) {

        this.totalUsers = totalUsers;
        this.totalOwners = totalOwners;
        this.totalPgs = totalPgs;
        this.totalRooms = totalRooms;
        this.totalBookings = totalBookings;
        this.totalReviews = totalReviews;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public Long getTotalOwners() {
        return totalOwners;
    }

    public Long getTotalPgs() {
        return totalPgs;
    }

    public Long getTotalRooms() {
        return totalRooms;
    }

    public Long getTotalBookings() {
        return totalBookings;
    }

    public Long getTotalReviews() {
        return totalReviews;
    }
}