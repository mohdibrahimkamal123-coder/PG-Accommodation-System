package com.Project.SmartStay.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.entity.Room;
import com.Project.SmartStay.exception.ResourceNotFoundException;
import com.Project.SmartStay.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // Add Room
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    // Get All Rooms
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Get Rooms By PG ID
    public List<Room> getRoomsByPgId(Long pgId) {
        return roomRepository.findByPgId(pgId);
    }

    // Update Room
    public Room updateRoom(Long id, Room updatedRoom) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room Not Found"));

        room.setRoomType(updatedRoom.getRoomType());
        room.setCapacity(updatedRoom.getCapacity());
        room.setAvailableBeds(updatedRoom.getAvailableBeds());
        room.setRent(updatedRoom.getRent());

        return roomRepository.save(room);
    }

    // Delete Room
    public String deleteRoom(Long id) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room Not Found"));

        roomRepository.delete(room);

        return "Room Deleted Successfully";
    }
    // Get Room By Id
    public Room getRoomById(Long roomId) {

        return roomRepository.findById(roomId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Room Not Found"));

    }

    // Get Available Rooms
    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailableBedsGreaterThan(0);
    }
}