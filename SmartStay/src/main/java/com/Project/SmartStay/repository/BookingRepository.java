package com.Project.SmartStay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Project.SmartStay.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	
	List<Booking> findByUserId(Long userId);
	List<Booking> findByRoomId(Long roomId);

}