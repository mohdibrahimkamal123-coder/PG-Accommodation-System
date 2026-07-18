package com.Project.SmartStay.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Project.SmartStay.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);

}