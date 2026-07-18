package com.Project.SmartStay.dto;

public class AdminDashboardResponse {

    private long totalUsers;
    private long totalOwners;
    private long totalPgs;
    private long totalRooms;
    private long totalBookings;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(
            long totalUsers,
            long totalOwners,
            long totalPgs,
            long totalRooms,
            long totalBookings) {

        this.totalUsers = totalUsers;
        this.totalOwners = totalOwners;
        this.totalPgs = totalPgs;
        this.totalRooms = totalRooms;
        this.totalBookings = totalBookings;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getTotalOwners() {
        return totalOwners;
    }

    public long getTotalPgs() {
        return totalPgs;
    }

    public long getTotalRooms() {
        return totalRooms;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

}