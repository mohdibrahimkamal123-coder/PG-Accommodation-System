package com.Project.SmartStay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Project.SmartStay.entity.Pg;

public interface PgRepository extends JpaRepository<Pg, Long> {

    List<Pg> findByCity(String city);
    List<Pg> findTop5ByOrderByRatingDesc();
    List<Pg> findByRentStartingLessThanEqual(Double rent);
    List<Pg> findByWifiAvailableTrue();
    List<Pg> findByFoodAvailableTrue();
    List<Pg> findByOwnerId(Long ownerId);

}