package com.Project.SmartStay.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.dto.BookingResponse;
import com.Project.SmartStay.entity.Booking;
import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Room;
import com.Project.SmartStay.exception.NoBedsAvailableException;
import com.Project.SmartStay.exception.ResourceNotFoundException;
import com.Project.SmartStay.repository.BookingRepository;
import com.Project.SmartStay.repository.PgRepository;
import com.Project.SmartStay.repository.RoomRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PgRepository pgRepository;

    // ==========================
    // Book Room
    // ==========================
    public Booking bookRoom(Booking booking) {

        Room room = roomRepository
                .findById(booking.getRoomId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room Not Found"));

        if (room.getAvailableBeds() <= 0) {
            throw new NoBedsAvailableException("No Beds Available");
        }

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

        room.setAvailableBeds(room.getAvailableBeds() + 1);

        roomRepository.save(room);

        bookingRepository.delete(booking);

        return "Booking Cancelled Successfully";
    }

    // ==========================
    // Admin
    // ==========================
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
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
    // Convert Entity -> DTO
    // ==========================
    private BookingResponse convertToResponse(Booking booking) {

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
                booking.getBookingDate(),
                booking.getStatus(),

                room.getRoomId(),
                room.getRoomType(),
                room.getRent(),

                pg.getPgId(),
                pg.getPgName(),
                pg.getAddress(),
                pg.getCity(),
                pg.getState()
        );
    }

}