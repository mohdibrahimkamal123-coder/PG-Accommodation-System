package com.Project.SmartStay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.entity.Room;
import com.Project.SmartStay.service.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/owner/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnerRoomController {

    @Autowired
    private RoomService roomService;

    // ==========================
    // Add Room
    // ==========================
    @PostMapping
    public Room addRoom(
            @Valid @RequestBody Room room) {

        return roomService.addRoom(room);

    }

    // ==========================
    // Get Rooms By PG
    // ==========================
    @GetMapping("/pg/{pgId}")
    public List<Room> getRoomsByPg(
            @PathVariable Long pgId) {

        return roomService.getRoomsByPgId(pgId);

    }

    // ==========================
    // Get Room By Id
    // ==========================
    @GetMapping("/{id}")
    public Room getRoom(
            @PathVariable Long id) {

        return roomService.getRoomById(id);

    }

    // ==========================
    // Update Room
    // ==========================
    @PutMapping("/{id}")
    public Room updateRoom(
            @PathVariable Long id,
            @Valid @RequestBody Room room) {

        return roomService.updateRoom(id, room);

    }

    // ==========================
    // Delete Room
    // ==========================
    @DeleteMapping("/{id}")
    public String deleteRoom(
            @PathVariable Long id) {

        return roomService.deleteRoom(id);

    }

}