package com.Project.SmartStay.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.exception.ResourceNotFoundException;
import com.Project.SmartStay.repository.PgRepository;

@Service
public class PgService {

    @Autowired
    private PgRepository pgRepository;
    
    @Autowired
    private FileStorageService fileStorageService;

    // Add PG
    public Pg addPg(Pg pg, MultipartFile image) {

        if (image != null && !image.isEmpty()) {

            String fileName = fileStorageService.saveImage(image);

            pg.setImageUrl(fileName);
        }

        return pgRepository.save(pg);
    }

    // Get All PGs
    public List<Pg> getAllPgs0() {
        return pgRepository.findAll();
    }

    // Get PG By ID
    public Pg getPgById(Long id) {

        return pgRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("PG Not Found"));
    }

    // Search PG By City
    public List<Pg> getPgsByCity(String city) {
        return pgRepository.findByCity(city);
    }

    // Top Rated PGs
    public List<Pg> getTopRatedPgs() {
        return pgRepository.findTop5ByOrderByRatingDesc();
    }

    // Update PG
    public Pg updatePg(Long id,
            Pg updatedPg,
            MultipartFile image) {

Pg pg = pgRepository.findById(id)
     .orElseThrow(() ->
             new ResourceNotFoundException("PG Not Found"));

pg.setPgName(updatedPg.getPgName());
pg.setDescription(updatedPg.getDescription());
pg.setAddress(updatedPg.getAddress());
pg.setCity(updatedPg.getCity());
pg.setState(updatedPg.getState());
pg.setPincode(updatedPg.getPincode());
pg.setRentStarting(updatedPg.getRentStarting());
pg.setFoodAvailable(updatedPg.getFoodAvailable());
pg.setWifiAvailable(updatedPg.getWifiAvailable());
pg.setLaundryAvailable(updatedPg.getLaundryAvailable());
pg.setGenderType(updatedPg.getGenderType());

// New Image Upload
if (image != null && !image.isEmpty()) {

 // Delete old image
 fileStorageService.deleteImage(pg.getImageUrl());

 // Save new image
 String fileName = fileStorageService.saveImage(image);

 pg.setImageUrl(fileName);
}

return pgRepository.save(pg);
}

    // Delete PG
    public String deletePg(Long id) {

        Pg pg = pgRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("PG Not Found"));

        // Delete image
        fileStorageService.deleteImage(pg.getImageUrl());

        // Delete PG
        pgRepository.delete(pg);

        return "PG Deleted Successfully";
    }

    // Search PG By Maximum Rent
    public List<Pg> getPgsByRent(Double rent) {
        return pgRepository.findByRentStartingLessThanEqual(rent);
    }

    // WiFi Available PGs
    public List<Pg> getWifiPgs() {
        return pgRepository.findByWifiAvailableTrue();
    }

    // Food Available PGs
    public List<Pg> getFoodPgs() {
        return pgRepository.findByFoodAvailableTrue();
    }
 // Get All PGs of Owner
    public List<Pg> getPgsByOwner(Long ownerId) {

        return pgRepository.findByOwnerId(ownerId);

    }
    public List<Pg> getAllPgs() {
        return pgRepository.findAll();
    }
    public List<Pg> getAllPgs1() {

        return pgRepository.findByApproved(true);

    }

}	