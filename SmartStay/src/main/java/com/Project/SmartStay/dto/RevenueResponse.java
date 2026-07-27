package com.Project.SmartStay.dto;

public class RevenueResponse {

    private Double totalRevenue;
    private Long totalBookings;
    private Long totalUsers;
    private Long totalPgs;

    public RevenueResponse(Double totalRevenue,
                           Long totalBookings,
                           Long totalUsers,
                           Long totalPgs) {
        this.totalRevenue = totalRevenue;
        this.totalBookings = totalBookings;
        this.totalUsers = totalUsers;
        this.totalPgs = totalPgs;
    }

	public Double getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(Double totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

	public Long getTotalBookings() {
		return totalBookings;
	}

	public void setTotalBookings(Long totalBookings) {
		this.totalBookings = totalBookings;
	}

	public Long getTotalUsers() {
		return totalUsers;
	}

	public void setTotalUsers(Long totalUsers) {
		this.totalUsers = totalUsers;
	}

	public Long getTotalPgs() {
		return totalPgs;
	}

	public void setTotalPgs(Long totalPgs) {
		this.totalPgs = totalPgs;
	}

   
}