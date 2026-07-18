package com.Project.SmartStay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.dto.OwnerLoginRequest;
import com.Project.SmartStay.dto.OwnerLoginResponse;
import com.Project.SmartStay.dto.OwnerRegisterRequest;
import com.Project.SmartStay.service.OwnerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/owners")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    // ==========================
    // Register Owner
    // POST: /api/owners/register
    // ==========================
    @PostMapping("/register")
    public String registerOwner(
            @Valid @RequestBody OwnerRegisterRequest request) {

        return ownerService.registerOwner(request);
    }

    // ==========================
    // Login Owner
    // POST: /api/owners/login
    // ==========================
    @PostMapping("/login")
    public OwnerLoginResponse loginOwner(
            @Valid @RequestBody OwnerLoginRequest request) {

        return ownerService.loginOwner(request);
    }

}