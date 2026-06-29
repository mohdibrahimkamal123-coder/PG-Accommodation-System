package com.Project.SmartStay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.dto.LoginRequest;
import com.Project.SmartStay.dto.LoginResponse;
import com.Project.SmartStay.dto.OwnerLoginResponse;
import com.Project.SmartStay.entity.Owner;
import com.Project.SmartStay.entity.User;
import com.Project.SmartStay.exception.InvalidCredentialsException;
import com.Project.SmartStay.exception.ResourceNotFoundException;
import com.Project.SmartStay.repository.OwnerRepository;
import com.Project.SmartStay.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User Not Found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new InvalidCredentialsException("Invalid Password");
        }

        return new LoginResponse(
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );
    }

    @PostMapping("/owner-login")
    public OwnerLoginResponse ownerLogin(@RequestBody LoginRequest request) {

        Owner owner = ownerRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Owner Not Found"));

        if (!owner.getPassword().equals(request.getPassword())) {
            throw new InvalidCredentialsException("Invalid Password");
        }

        return new OwnerLoginResponse(
                owner.getOwnerId(),
                owner.getOwnerName(),
                owner.getEmail(),
                owner.getRole()
        );
    }
}