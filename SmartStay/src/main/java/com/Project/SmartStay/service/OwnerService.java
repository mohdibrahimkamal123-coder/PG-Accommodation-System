package com.Project.SmartStay.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.entity.Owner;
import com.Project.SmartStay.exception.ResourceNotFoundException;
import com.Project.SmartStay.repository.OwnerRepository;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    // Register Owner
    public Owner registerOwner(Owner owner) {
        return ownerRepository.save(owner);
    }

    // Get All Owners
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    // Get Owner By ID
    public Owner getOwnerById(Long id) {

        return ownerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Owner Not Found"));
    }

    // Update Owner
    public Owner updateOwner(Long id, Owner updatedOwner) {

        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Owner Not Found"));

        owner.setOwnerName(updatedOwner.getOwnerName());
        owner.setEmail(updatedOwner.getEmail());
        owner.setPassword(updatedOwner.getPassword());
        owner.setPhone(updatedOwner.getPhone());
        owner.setRole(updatedOwner.getRole());

        return ownerRepository.save(owner);
    }

    // Delete Owner
    public String deleteOwner(Long id) {

        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Owner Not Found"));

        ownerRepository.delete(owner);

        return "Owner Deleted Successfully";
    }
}