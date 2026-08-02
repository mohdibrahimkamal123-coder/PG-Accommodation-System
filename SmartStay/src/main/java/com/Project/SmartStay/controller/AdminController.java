package com.Project.SmartStay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.Project.SmartStay.dto.AdminDashboardResponse;
import com.Project.SmartStay.dto.AdminLoginRequest;
import com.Project.SmartStay.dto.AdminLoginResponse;
import com.Project.SmartStay.dto.BookingResponse;
import com.Project.SmartStay.dto.BookingStatusUpdateRequest;
import com.Project.SmartStay.entity.Owner;
import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Review;
import com.Project.SmartStay.entity.User;
import com.Project.SmartStay.service.AdminService;
import java.util.List;
import com.Project.SmartStay.dto.ReportResponse;
import com.Project.SmartStay.dto.RevenueResponse;
import com.Project.SmartStay.dto.ReviewResponse;
import com.Project.SmartStay.dto.ExportResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @PostMapping("/login")
    public AdminLoginResponse login(
            @RequestBody AdminLoginRequest request) {
        return adminService.login(request);
    }
    @PostMapping("/logout")
    public String logout() {
        return "Logged Out Successfully";
    }
    @GetMapping("/dashboard")
    public AdminDashboardResponse getDashboard() {
        return adminService.getDashboard();
    }
    @GetMapping("/statistics")
    public AdminDashboardResponse getStatistics() {
        return adminService.getStatistics();
    }
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return adminService.getUserById(id);
    }
    @PutMapping("/users/block/{id}")
    public String blockUser(@PathVariable Long id) {
        return adminService.blockUser(id);
    }
    @PutMapping("/users/unblock/{id}")
    public String unblockUser(@PathVariable Long id) {
        return adminService.unblockUser(id);
    }
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        return adminService.deleteUser(id);
    }
    @GetMapping("/owners")
    public List<Owner> getAllOwners() {
        return adminService.getAllOwners();
    }
    @GetMapping("/owners/{id}")
    public Owner getOwnerById(@PathVariable Long id) {
        return adminService.getOwnerById(id);
    }
    @PutMapping("/owners/approve/{id}")
    public String approveOwner(@PathVariable Long id) {
        return adminService.approveOwner(id);
    }
    @PutMapping("/owners/reject/{id}")
    public String rejectOwner(@PathVariable Long id) {
        return adminService.rejectOwner(id);
    }
    @DeleteMapping("/owners/{id}")
    public String deleteOwner(@PathVariable Long id) {
        return adminService.deleteOwner(id);
    }
    @GetMapping("/pgs")
    public List<Pg> getAllPgs() {
        return adminService.getAllPgs();
    }
    @GetMapping("/pgs/{id}")
    public Pg getPgById(@PathVariable Long id) {
        return adminService.getPgById(id);
    }
    @PutMapping("/pgs/approve/{id}")
    public String approvePg(@PathVariable Long id) {
        return adminService.approvePg(id);
    }
    @PutMapping("/pgs/reject/{id}")
    public String rejectPg(@PathVariable Long id) {
        return adminService.rejectPg(id);
    }
    @DeleteMapping("/pgs/{id}")
    public String deletePg(@PathVariable Long id) {
        return adminService.deletePg(id);
    }
    @GetMapping("/bookings")
    public List<BookingResponse> getAllBookings() {
        return adminService.getAllBookings();
    }
    @GetMapping("/bookings/{id}")
    public BookingResponse getBookingById(
            @PathVariable Long id) {
        return adminService.getBookingById(id);
    }
    @DeleteMapping("/bookings/{id}")
    public String deleteBooking(
            @PathVariable Long id) {
        return adminService.deleteBooking(id);
    }
    @PutMapping("/bookings/status/{id}")
    public BookingResponse updateBookingStatus(
            @PathVariable Long id,
            @Valid @RequestBody BookingStatusUpdateRequest request) {
        return adminService.updateBookingStatus(id, request);
    }
    @GetMapping("/reviews")
    public List<ReviewResponse> getAllReviews() {
        return adminService.getAllReviews();
    }
    @DeleteMapping("/reviews/{id}")
    public String deleteReview(
            @PathVariable Long id) {
        return adminService.deleteReview(id);
    }
    @GetMapping("/reports")
    public ReportResponse getReports() {
        return adminService.getReports();
    }
    @GetMapping("/revenue")
    public RevenueResponse getRevenue() {
        return adminService.getRevenue();
    }
    @GetMapping("/export")
    public ExportResponse exportData() {
        return adminService.exportData();
    }

}