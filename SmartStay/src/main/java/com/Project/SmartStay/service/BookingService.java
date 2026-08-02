package com.Project.SmartStay.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.dto.BookingResponse;
import com.Project.SmartStay.entity.Booking;
import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Room;
import com.Project.SmartStay.entity.User;
import com.Project.SmartStay.exception.NoBedsAvailableException;
import com.Project.SmartStay.exception.ResourceNotFoundException;
import com.Project.SmartStay.repository.BookingRepository;
import com.Project.SmartStay.repository.PgRepository;
import com.Project.SmartStay.repository.RoomRepository;
import com.Project.SmartStay.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PgRepository pgRepository;

    @Autowired
    private UserRepository userRepository;
    
    // ==========================
    // Book Room
    // ==========================
    public Booking bookRoom(Booking booking) {

        Room room = roomRepository
                .findById(booking.getRoomId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room Not Found"));

        // Check Bed Availability
        if (room.getAvailableBeds() <= 0) {
            throw new NoBedsAvailableException("No Beds Available");
        }

        // Generate Booking Number
        booking.setBookingNumber(generateBookingNumber());

        // Default Status
        if (booking.getStatus() == null || booking.getStatus().isBlank()) {
            booking.setStatus("PENDING");
        }

        // Reduce Available Beds
        room.setAvailableBeds(room.getAvailableBeds() - 1);
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }
    // ==========================
    // Get User Bookings
    // ==========================
    public List<BookingResponse> getBookingsByUser(Long userId) {

        List<Booking> bookings = bookingRepository.findByUserId(userId);

        return bookings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==========================
    // Cancel Booking
    // ==========================
    public String cancelBooking(Long bookingId) {

        Booking booking = bookingRepository
                .findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking Not Found"));

        Room room = roomRepository
                .findById(booking.getRoomId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room Not Found"));

        // Restore Available Bed
        room.setAvailableBeds(room.getAvailableBeds() + 1);
        roomRepository.save(room);

        // Update Status Before Delete (optional for history)
        booking.setStatus("CANCELLED");

        bookingRepository.delete(booking);

        return "Booking Cancelled Successfully";
    }

    // ==========================
    // Get All Bookings
    // ==========================
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // ==========================
    // Get Booking By Id
    // ==========================
    public BookingResponse getBookingById(Long bookingId) {

        Booking booking = bookingRepository
                .findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking Not Found"));

        return convertToResponse(booking);
    }
    // =====================================================
    // OWNER : Get All Bookings of Owner
    // =====================================================
    public List<BookingResponse> getBookingsByOwner(Long ownerId) {

        List<Pg> ownerPgs = pgRepository.findByOwnerId(ownerId);

        List<BookingResponse> responses = new ArrayList<>();

        for (Pg pg : ownerPgs) {

            List<Room> rooms = roomRepository.findByPgId(pg.getPgId());

            for (Room room : rooms) {

                List<Booking> bookings =
                        bookingRepository.findByRoomId(room.getRoomId());

                for (Booking booking : bookings) {
                    responses.add(convertToResponse(booking));
                }
            }
        }

        return responses;
    }

    // =====================================================
    // OWNER : Get Booking By Id
    // =====================================================
    public BookingResponse getOwnerBookingById(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking Not Found"));

        return convertToResponse(booking);
    }

    // =====================================================
    // OWNER : Approve Booking
    // =====================================================
    public String approveBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking Not Found"));

        booking.setStatus("APPROVED");
        bookingRepository.save(booking);

        return "Booking Approved Successfully";
    }

    // =====================================================
    // OWNER : Reject Booking
    // =====================================================
    public String rejectBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking Not Found"));

        booking.setStatus("REJECTED");
        bookingRepository.save(booking);

        return "Booking Rejected Successfully";
    }

    // =====================================================
    // OWNER : Complete Booking
    // =====================================================
    public String completeBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking Not Found"));

        booking.setStatus("COMPLETED");
        bookingRepository.save(booking);

        return "Booking Completed Successfully";
    }

    // ==========================
    // Generate Booking Number
    // ==========================
    private String generateBookingNumber() {

        long count = bookingRepository.count() + 1;

        String date = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        return "BK" + date + String.format("%04d", count);
    }
    // =====================================================
    // Convert Entity -> DTO
    // =====================================================
    private BookingResponse convertToResponse(Booking booking) {

        User user = userRepository
                .findById(booking.getUserId())
                .orElse(null);

        Room room = roomRepository
                .findById(booking.getRoomId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room Not Found"));

        Pg pg = pgRepository
                .findById(room.getPgId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("PG Not Found"));

        return new BookingResponse(

                booking.getBookingId(),
                booking.getBookingNumber(),
                booking.getBookingDate(),
                booking.getStatus(),

                booking.getUserId(),
                user != null ? user.getFullName() : "Unknown User",

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
    
    public BookingResponse createBooking(Booking booking) {
        Booking savedBooking = bookRoom(booking);
        return convertToResponse(savedBooking);
    }

}