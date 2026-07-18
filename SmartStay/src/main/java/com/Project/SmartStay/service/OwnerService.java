package com.Project.SmartStay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.dto.OwnerLoginRequest;
import com.Project.SmartStay.dto.OwnerLoginResponse;
import com.Project.SmartStay.dto.OwnerRegisterRequest;
import com.Project.SmartStay.entity.Owner;
import com.Project.SmartStay.repository.OwnerRepository;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    // ==========================
    // Register Owner
    // ==========================
    public String registerOwner(OwnerRegisterRequest request) {

        if (ownerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered.");
        }

        if (ownerRepository.existsByMobileNumber(request.getMobileNumber())) {
            throw new RuntimeException("Mobile number already registered.");
        }

        Owner owner = new Owner();

        owner.setFullName(request.getFullName());
        owner.setEmail(request.getEmail());
        owner.setMobileNumber(request.getMobileNumber());

        // NOTE:
        // Later we will encrypt password using BCrypt.
        owner.setPassword(request.getPassword());

        ownerRepository.save(owner);

        return "Owner Registered Successfully";
    }

    // ==========================
    // Login Owner
    // ==========================
    public OwnerLoginResponse loginOwner(OwnerLoginRequest request) {

        Owner owner = ownerRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email or Password"));

        if (!owner.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Email or Password");
        }

        return new OwnerLoginResponse(
                owner.getOwnerId(),
                owner.getFullName(),
                owner.getEmail(),
                owner.getMobileNumber(),
                "Login Successful"
        );
    }

}