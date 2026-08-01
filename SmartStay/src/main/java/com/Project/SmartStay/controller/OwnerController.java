package com.Project.SmartStay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public String registerOwner(@Valid @RequestBody OwnerRegisterRequest request) {
        return ownerService.registerOwner(request);
    }

    // ==========================
    // Login Owner
    // ==========================
    @PostMapping("/login")
    public OwnerLoginResponse loginOwner(@Valid @RequestBody OwnerLoginRequest request) {
        return ownerService.loginOwner(request);
    }

    // ==========================
    // Get Owner Profile
    // ==========================
    @GetMapping("/profile/{ownerId}")
    public OwnerProfileResponse getProfile(@PathVariable Long ownerId) {
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

    // ==========================
    // Add PG with Image Upload (FIXED)
    // ==========================
    @PostMapping(value = "/add-pg", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addPg(
            @RequestPart("pg") Pg pg,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {

        try {
            // 1. Image check karein aur 'uploads' folder mein save karein
            if (imageFile != null && !imageFile.isEmpty()) {
                String uploadDir = "uploads/";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs(); // Folder auto create ho jayega agar nahi hai
                }

                // Unique Filename (Example: 1718293021_room.jpg)
                String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);

                // File system par write karein
                Files.write(filePath, imageFile.getBytes());

                // Database me File ka Access Path store karein
                pg.setImageUrl("/uploads/" + fileName);
            }

            // 2. Save directly in database
            Pg savedPg = pgRepository.save(pg);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPg);

        } catch (IOException e) {
            e.printStackTrace(); // Console check karne ke liye
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving image file: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Console check karne ke liye
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add PG: " + e.getMessage());
        }
    }
}