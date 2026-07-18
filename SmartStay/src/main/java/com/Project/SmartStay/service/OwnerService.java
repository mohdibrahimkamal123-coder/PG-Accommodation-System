package com.Project.SmartStay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.dto.ChangePasswordRequest;
import com.Project.SmartStay.dto.OwnerLoginRequest;
import com.Project.SmartStay.dto.OwnerLoginResponse;
import com.Project.SmartStay.dto.OwnerProfileResponse;
import com.Project.SmartStay.dto.OwnerRegisterRequest;
import com.Project.SmartStay.dto.OwnerUpdateRequest;
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

    // ==========================
    // Get Owner Profile
    // ==========================
    public OwnerProfileResponse getProfile(Long ownerId) {

        Owner owner = ownerRepository.findById(ownerId)
                .orElseThrow(() ->
                        new RuntimeException("Owner Not Found"));

        return new OwnerProfileResponse(
                owner.getOwnerId(),
                owner.getFullName(),
                owner.getEmail(),
                owner.getMobileNumber()
        );
    }

    // ==========================
    // Update Owner Profile
    // ==========================
    public String updateProfile(Long ownerId, OwnerUpdateRequest request) {

        Owner owner = ownerRepository.findById(ownerId)
                .orElseThrow(() ->
                        new RuntimeException("Owner Not Found"));

        // Check duplicate email
        if (!owner.getEmail().equals(request.getEmail())
                && ownerRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException("Email already exists.");
        }

        // Check duplicate mobile
        if (!owner.getMobileNumber().equals(request.getMobileNumber())
                && ownerRepository.existsByMobileNumber(request.getMobileNumber())) {

            throw new RuntimeException("Mobile number already exists.");
        }

        owner.setFullName(request.getFullName());
        owner.setEmail(request.getEmail());
        owner.setMobileNumber(request.getMobileNumber());

        ownerRepository.save(owner);

        return "Profile Updated Successfully";
    }

    // ==========================
    // Change Password
    // ==========================
    public String changePassword(Long ownerId,
                                 ChangePasswordRequest request) {

        Owner owner = ownerRepository.findById(ownerId)
                .orElseThrow(() ->
                        new RuntimeException("Owner Not Found"));

        if (!owner.getPassword().equals(request.getOldPassword())) {
            throw new RuntimeException("Old Password is Incorrect");
        }

        owner.setPassword(request.getNewPassword());

        ownerRepository.save(owner);

        return "Password Changed Successfully";
    }

}