package com.Project.SmartStay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.dto.ChangePasswordRequest;
import com.Project.SmartStay.dto.OwnerLoginRequest;
import com.Project.SmartStay.dto.OwnerLoginResponse;
import com.Project.SmartStay.dto.OwnerProfileResponse;
import com.Project.SmartStay.dto.OwnerRegisterRequest;
import com.Project.SmartStay.dto.OwnerUpdateRequest;
import com.Project.SmartStay.entity.Booking;
import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Room;
import com.Project.SmartStay.service.OwnerService;
import com.Project.SmartStay.repository.PgRepository;
import com.Project.SmartStay.repository.RoomRepository;
import com.Project.SmartStay.repository.BookingRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/owners")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnerController {

	@Autowired
	private PgRepository pgRepository;

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private BookingRepository bookingRepository;
    @Autowired
    private OwnerService ownerService;

    // ==========================
    // Register Owner
    // ==========================
    @PostMapping("/register")
    public String registerOwner(
            @Valid @RequestBody OwnerRegisterRequest request) {

        return ownerService.registerOwner(request);
    }

    // ==========================
    // Login Owner
    // ==========================
    @PostMapping("/login")
    public OwnerLoginResponse loginOwner(
            @Valid @RequestBody OwnerLoginRequest request) {

        return ownerService.loginOwner(request);
    }

    // ==========================
    // Get Owner Profile
    // ==========================
    @GetMapping("/profile/{ownerId}")
    public OwnerProfileResponse getProfile(
            @PathVariable Long ownerId) {

        return ownerService.getProfile(ownerId);
    }

    // ==========================
    // Update Owner Profile
    // ==========================
    @PutMapping("/profile/{ownerId}")
    public String updateProfile(
            @PathVariable Long ownerId,
            @Valid @RequestBody OwnerUpdateRequest request) {

        return ownerService.updateProfile(ownerId, request);
    }

    // ==========================
    // Change Password
    // ==========================
    @PutMapping("/change-password/{ownerId}")
    public String changePassword(
            @PathVariable Long ownerId,
            @Valid @RequestBody ChangePasswordRequest request) {

        return ownerService.changePassword(ownerId, request);
    }
 // ==========================
 // Owner Dashboard
 // ==========================
    @GetMapping("/dashboard/{ownerId}")
    public Map<String, Object> getDashboard(@PathVariable Long ownerId) {

        OwnerProfileResponse owner = ownerService.getProfile(ownerId);

        List<Pg> pgs = pgRepository.findByOwnerId(ownerId);

        List<Long> pgIds = pgs.stream()
                .map(Pg::getPgId)
                .collect(Collectors.toList());

        List<Room> rooms = roomRepository.findByPgIdIn(pgIds);

        List<Long> roomIds = rooms.stream()
                .map(Room::getRoomId)
                .collect(Collectors.toList());

        List<Booking> bookings = bookingRepository.findByRoomIdIn(roomIds);

        long occupiedRooms = rooms.stream()
                .filter(r -> r.getAvailableBeds() < r.getCapacity())
                .count();

        long availableRooms = rooms.size() - occupiedRooms;

        long pending = bookings.stream()
                .filter(b -> "Pending".equalsIgnoreCase(b.getStatus()))
                .count();

        long approved = bookings.stream()
                .filter(b -> "Approved".equalsIgnoreCase(b.getStatus()))
                .count();

        long rejected = bookings.stream()
                .filter(b -> "Rejected".equalsIgnoreCase(b.getStatus()))
                .count();

        long completed = bookings.stream()
                .filter(b -> "Completed".equalsIgnoreCase(b.getStatus()))
                .count();

        Map<String, Object> response = new HashMap<>();

        response.put("ownerId", ownerId);
        response.put("fullName", owner.getFullName());
        response.put("email", owner.getEmail());
        response.put("phone", owner.getMobileNumber());

        response.put("totalPGs", pgs.size());
        response.put("totalRooms", rooms.size());
        response.put("occupiedRooms", occupiedRooms);
        response.put("availableRooms", availableRooms);

        response.put("totalBookings", bookings.size());
        response.put("pendingBookings", pending);
        response.put("approvedBookings", approved);
        response.put("rejectedBookings", rejected);
        response.put("completedBookings", completed);

        return response;
    }
    
    

}