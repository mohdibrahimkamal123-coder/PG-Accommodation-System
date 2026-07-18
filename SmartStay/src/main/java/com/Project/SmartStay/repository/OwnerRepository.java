package com.Project.SmartStay.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Project.SmartStay.entity.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {

    // Find owner by email (used for login)
    Optional<Owner> findByEmail(String email);

    // Check if email already exists
    boolean existsByEmail(String email);

    // Check if mobile number already exists
    boolean existsByMobileNumber(String mobileNumber);
}