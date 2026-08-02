package com.Project.SmartStay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.Project.SmartStay.dto.AdminDashboardResponse;
import com.Project.SmartStay.dto.AdminLoginRequest;
import com.Project.SmartStay.dto.AdminLoginResponse;
import com.Project.SmartStay.dto.BookingResponse;
import com.Project.SmartStay.dto.BookingStatusUpdateRequest;
import com.Project.SmartStay.dto.ExportResponse;
import com.Project.SmartStay.dto.ReportResponse;
import com.Project.SmartStay.dto.RevenueResponse;

import com.Project.SmartStay.entity.Admin;
import com.Project.SmartStay.entity.Booking;
import com.Project.SmartStay.entity.Owner;
import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Review;
import com.Project.SmartStay.entity.Room;
import com.Project.SmartStay.entity.User;

import com.Project.SmartStay.repository.AdminRepository;
import com.Project.SmartStay.repository.UserRepository;
import com.Project.SmartStay.repository.OwnerRepository;
import com.Project.SmartStay.repository.PgRepository;
import com.Project.SmartStay.repository.RoomRepository;
import com.Project.SmartStay.repository.BookingRepository;
import com.Project.SmartStay.repository.ReviewRepository;


@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private PgRepository pgRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // Statuses an admin is allowed to set on a booking
    private static final List<String> VALID_BOOKING_STATUSES =
            List.of("PENDING", "APPROVED", "REJECTED", "COMPLETED", "CANCELLED");

    public AdminLoginResponse login(AdminLoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email or Password"));
        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Email or Password");
        }
        return new AdminLoginResponse(
                admin.getAdminId(),
                admin.getFullName(),
                admin.getEmail(),
                "Login Successful"
        );
    }
    public AdminDashboardResponse getDashboard() {
        return new AdminDashboardResponse(
                userRepository.count(),
                ownerRepository.count(),
                pgRepository.count(),
                roomRepository.count(),
                bookingRepository.count()
                );
    }
    public AdminDashboardResponse getStatistics() {
        return getDashboard();
    }

    // =====================================================
    // ADMIN : Users - block / unblock
    // =====================================================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));
    }
    public String blockUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));
        user.setBlocked(true);
        userRepository.save(user);
        return "User Blocked Successfully";
    }
    public String unblockUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));
        user.setBlocked(false);
        userRepository.save(user);
        return "User Unblocked Successfully";
    }
    public String deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));
        userRepository.delete(user);
        return "User Deleted Successfully";
    }

    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }
    public Owner getOwnerById(Long id) {
        return ownerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Owner Not Found"));
    }
    public String approveOwner(Long id) {
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Owner Not Found"));
        owner.setApproved(true);
        ownerRepository.save(owner);
        return "Owner Approved Successfully";
    }
    public String rejectOwner(Long id) {
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Owner Not Found"));
        owner.setApproved(false);
        ownerRepository.save(owner);
        return "Owner Rejected Successfully";
    }
    public String deleteOwner(Long id) {
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Owner Not Found"));
        ownerRepository.delete(owner);
        return "Owner Deleted Successfully";
    }

    public List<Pg> getAllPgs() {
        return pgRepository.findAll();
    }
    public Pg getPgById(Long id) {
        return pgRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("PG Not Found"));
    }
    public String approvePg(Long id) {
        Pg pg = pgRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("PG Not Found"));
        pg.setApproved(true);
        pgRepository.save(pg);
        return "PG Approved Successfully";
    }
    public String rejectPg(Long id) {
        Pg pg = pgRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("PG Not Found"));
        pg.setApproved(false);
        pgRepository.save(pg);
        return "PG Rejected Successfully";
    }
    public String deletePg(Long id) {
        Pg pg = pgRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("PG Not Found"));
        pgRepository.delete(pg);
        return "PG Deleted Successfully";
    }

    private BookingResponse convertToBookingResponse(Booking booking) {

        Room room = roomRepository.findById(booking.getRoomId())
                .orElseThrow(() ->
                        new RuntimeException("Room Not Found"));

        Pg pg = pgRepository.findById(room.getPgId())
                .orElseThrow(() ->
                        new RuntimeException("PG Not Found"));

        return new BookingResponse(
                booking.getBookingId(),
                booking.getBookingNumber(),
                booking.getBookingDate(),
                booking.getStatus(),
                booking.getMoveInDate(),
                booking.getExpectedStayMonths(),
                booking.getEmergencyContact(),
                booking.getIdProofType(),
                booking.getIdProofNumber(),
                booking.getSpecialRequest(),

                room.getRoomId(),
                room.getRoomNumber(),
                room.getRoomType(),
                room.getRent(),

                pg.getPgId(),
                pg.getPgName(),
                pg.getAddress(),
                pg.getCity(),
                pg.getState()
        );
    }

    // =====================================================
    // ADMIN : Bookings - view / delete / status update
    // =====================================================
    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(this::convertToBookingResponse)
                .toList();
    }
    public BookingResponse getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking Not Found"));
        return convertToBookingResponse(booking);
    }
    public String deleteBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking Not Found"));
        Room room = roomRepository.findById(booking.getRoomId())
                .orElseThrow(() ->
                        new RuntimeException("Room Not Found"));
        room.setAvailableBeds(room.getAvailableBeds() + 1);
        roomRepository.save(room);
        bookingRepository.delete(booking);
        return "Booking Deleted Successfully";
    }

    /**
     * Admin updates a booking's status (e.g. PENDING, APPROVED, REJECTED,
     * COMPLETED, CANCELLED). If the new status frees up the room (REJECTED /
     * CANCELLED) the bed count is restored; if a previously freed booking is
     * reactivated, a bed is re-reserved (fails if none are available).
     */
    public BookingResponse updateBookingStatus(Long bookingId, BookingStatusUpdateRequest request) {

        if (request == null || request.getStatus() == null || request.getStatus().isBlank()) {
            throw new RuntimeException("Status is required");
        }

        String newStatus = request.getStatus().trim().toUpperCase();

        if (!VALID_BOOKING_STATUSES.contains(newStatus)) {
            throw new RuntimeException(
                    "Invalid Status. Allowed values: " + VALID_BOOKING_STATUSES);
        }

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking Not Found"));

        String previousStatus = booking.getStatus();

        boolean wasInactive = "REJECTED".equals(previousStatus) || "CANCELLED".equals(previousStatus);
        boolean isNowInactive = "REJECTED".equals(newStatus) || "CANCELLED".equals(newStatus);

        if (!wasInactive && isNowInactive) {
            // Booking is being rejected/cancelled -> free the bed
            Room room = roomRepository.findById(booking.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room Not Found"));
            room.setAvailableBeds(room.getAvailableBeds() + 1);
            roomRepository.save(room);
        } else if (wasInactive && !isNowInactive) {
            // Booking is being reactivated -> re-reserve a bed
            Room room = roomRepository.findById(booking.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room Not Found"));
            if (room.getAvailableBeds() <= 0) {
                throw new RuntimeException("Cannot reactivate booking: No Beds Available");
            }
            room.setAvailableBeds(room.getAvailableBeds() - 1);
            roomRepository.save(room);
        }

        booking.setStatus(newStatus);
        bookingRepository.save(booking);

        return convertToBookingResponse(booking);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
    public String deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new RuntimeException("Review Not Found"));
        reviewRepository.delete(review);
        return "Review Deleted Successfully";
    }

    // Reports
    public ReportResponse getReports() {
        return new ReportResponse(
                userRepository.count(),
                ownerRepository.count(),
                pgRepository.count(),
                roomRepository.count(),
                bookingRepository.count(),
                reviewRepository.count()
        );
    }

    // Revenue
    public RevenueResponse getRevenue() {

        Double totalRevenue = 0.0;

        List<Booking> bookings = bookingRepository.findAll();

        for (Booking booking : bookings) {

            Room room = roomRepository.findById(booking.getRoomId())
                    .orElseThrow(() ->
                            new RuntimeException("Room Not Found"));

            totalRevenue += room.getRent();
        }

        return new RevenueResponse(
                totalRevenue,
                bookingRepository.count(),
                userRepository.count(),
                pgRepository.count()
        );
    }

    // Export Data
    public ExportResponse exportData() {
        return new ExportResponse(
                userRepository.findAll(),
                ownerRepository.findAll(),
                pgRepository.findAll(),
                roomRepository.findAll(),
                bookingRepository.findAll(),
                reviewRepository.findAll());
    }

}