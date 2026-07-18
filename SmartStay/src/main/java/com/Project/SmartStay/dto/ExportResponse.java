package com.Project.SmartStay.dto;

import java.util.List;

import com.Project.SmartStay.entity.Booking;
import com.Project.SmartStay.entity.Owner;
import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Review;
import com.Project.SmartStay.entity.Room;
import com.Project.SmartStay.entity.User;

public class ExportResponse {

    private List<User> users;
    private List<Owner> owners;
    private List<Pg> pgs;
    private List<Room> rooms;
    private List<Booking> bookings;
    private List<Review> reviews;

    public ExportResponse() {
    }

    public ExportResponse(List<User> users,
                          List<Owner> owners,
                          List<Pg> pgs,
                          List<Room> rooms,
                          List<Booking> bookings,
                          List<Review> reviews) {

        this.users = users;
        this.owners = owners;
        this.pgs = pgs;
        this.rooms = rooms;
        this.bookings = bookings;
        this.reviews = reviews;
    }

    public List<User> getUsers() {
        return users;
    }

    public List<Owner> getOwners() {
        return owners;
    }

    public List<Pg> getPgs() {
        return pgs;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void setOwners(List<Owner> owners) {
        this.owners = owners;
    }

    public void setPgs(List<Pg> pgs) {
        this.pgs = pgs;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}