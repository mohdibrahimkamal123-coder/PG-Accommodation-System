package com.Project.SmartStay.service;

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

    // Book Room
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

    // Get User Bookings
    public List<BookingResponse> getBookingsByUser(Long userId) {

        List<Booking> bookings = bookingRepository.findByUserId(userId);

        return bookings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Cancel Booking
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

    // Admin
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get Booking By Id
    public BookingResponse getBookingById(Long bookingId) {

        Booking booking = bookingRepository
                .findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking Not Found"));

        return convertToResponse(booking);
    }

    // Convert Entity -> DTO
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