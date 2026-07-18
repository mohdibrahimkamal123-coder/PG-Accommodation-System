package com.Project.SmartStay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.dto.BookingResponse;
import com.Project.SmartStay.service.BookingService;

@RestController
@RequestMapping("/api/owner/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnerBookingController {

    @Autowired
    private BookingService bookingService;

    // ==========================================
    // Get All Bookings of Owner
    // ==========================================
    @GetMapping("/{ownerId}")
    public List<BookingResponse> getOwnerBookings(
            @PathVariable Long ownerId) {

        return bookingService.getBookingsByOwner(ownerId);
    }

    // ==========================================
    // Get Booking By Id
    // ==========================================
    @GetMapping("/details/{bookingId}")
    public BookingResponse getBookingById(
            @PathVariable Long bookingId) {

        return bookingService.getOwnerBookingById(bookingId);
    }

    // ==========================================
    // Approve Booking
    // ==========================================
    @PutMapping("/{bookingId}/approve")
    public String approveBooking(
            @PathVariable Long bookingId) {

        return bookingService.approveBooking(bookingId);
    }

    // ==========================================
    // Reject Booking
    // ==========================================
    @PutMapping("/{bookingId}/reject")
    public String rejectBooking(
            @PathVariable Long bookingId) {

        return bookingService.rejectBooking(bookingId);
    }

    // ==========================================
    // Complete Booking
    // ==========================================
    @PutMapping("/{bookingId}/complete")
    public String completeBooking(
            @PathVariable Long bookingId) {

        return bookingService.completeBooking(bookingId);
    }

}