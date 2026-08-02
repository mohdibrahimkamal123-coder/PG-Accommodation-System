package com.Project.SmartStay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.service.PgService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pgs")
@CrossOrigin(origins = "http://localhost:5173")
public class PgController {

    @Autowired
    private PgService pgService;

    // ==========================
    // Add PG with Image
    // ==========================
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Pg addPg(
            @Valid @ModelAttribute Pg pg,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        return pgService.addPg(pg, image);
    }

    // ==========================
    // Get All PGs
    // ==========================
    @GetMapping
    public List<Pg> getAllPgs() {

        return pgService.getAllPgs();
    }

    // ==========================
    // Get PG By ID
    // ==========================
    @GetMapping("/{id}")
    public Pg getPgById(@PathVariable Long id) {

        return pgService.getPgById(id);
    }

    // ==========================
    // Get PGs By City
    // ==========================
    @GetMapping("/city/{city}")
    public List<Pg> getPgsByCity(@PathVariable String city) {

        return pgService.getPgsByCity(city);
    }

    // ==========================
    // Top Rated PGs
    // ==========================
    @GetMapping("/top-rated")
    public List<Pg> getTopRatedPgs() {

        return pgService.getTopRatedPgs();
    }

    // ==========================
    // Update PG with Image
    // ==========================
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Pg updatePg(
            @PathVariable Long id,
            @Valid @ModelAttribute Pg pg,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        return pgService.updatePg(id, pg, image);
    }

    // ==========================
    // Delete PG
    // ==========================
    @DeleteMapping("/{id}")
    public String deletePg(@PathVariable Long id) {

        return pgService.deletePg(id);
    }

    // ==========================
    // Search By Rent
    // ==========================
    @GetMapping("/rent/{rent}")
    public List<Pg> getPgsByRent(@PathVariable Double rent) {

        return pgService.getPgsByRent(rent);
    }

    // ==========================
    // WiFi Available PGs
    // ==========================
    @GetMapping("/wifi")
    public List<Pg> getWifiPgs() {

        return pgService.getWifiPgs();
    }

    // ==========================
    // Food Available PGs
    // ==========================
    @GetMapping("/food")
    public List<Pg> getFoodPgs() {

        return pgService.getFoodPgs();
    }

}