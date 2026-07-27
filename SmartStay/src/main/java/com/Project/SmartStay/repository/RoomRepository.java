package com.Project.SmartStay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Project.SmartStay.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByPgId(Long pgId);

    List<Room> findByAvailableBedsGreaterThan(int beds);

    long countByPgId(Long pgId);

    List<Room> findByPgIdIn(List<Long> pgIds);
}