package com.Project.SmartStay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.entity.Owner;
import com.Project.SmartStay.service.OwnerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/owners")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @PostMapping("/register")
    public Owner registerOwner(@Valid @RequestBody Owner owner) {
        return ownerService.registerOwner(owner);
    }

    @GetMapping
    public List<Owner> getAllOwners() {
        return ownerService.getAllOwners();
    }

    @GetMapping("/{id}")
    public Owner getOwnerById(@PathVariable Long id) {
        return ownerService.getOwnerById(id);
    }
    
    @PutMapping("/{id}")
    public Owner updateOwner(@PathVariable Long id,
    		@Valid @RequestBody Owner owner) {

        return ownerService.updateOwner(id, owner);
    }
    
    @DeleteMapping("/{id}")
    public String deleteOwner(@PathVariable Long id) {

        return ownerService.deleteOwner(id);
    }
}