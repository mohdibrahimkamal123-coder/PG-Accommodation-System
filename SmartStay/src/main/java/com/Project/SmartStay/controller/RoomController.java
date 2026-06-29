package com.Project.SmartStay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.entity.Room;
import com.Project.SmartStay.service.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public Room addRoom(@Valid @RequestBody Room room) {
        return roomService.addRoom(room);
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/pg/{pgId}")
    public List<Room> getRoomsByPgId(@PathVariable Long pgId) {
        return roomService.getRoomsByPgId(pgId);
    }
    
    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Long id,
    		@Valid @RequestBody Room room) {

        return roomService.updateRoom(id, room);
    }
    
    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {

        return roomService.deleteRoom(id);
    }
    
    @GetMapping("/available")
    public List<Room> getAvailableRooms() {

        return roomService.getAvailableRooms();
    }
}