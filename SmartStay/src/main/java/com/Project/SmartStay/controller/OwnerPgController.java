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
@RequestMapping("/api/owner/pgs")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnerPgController {

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
    // Get Owner PGs
    // ==========================
    @GetMapping("/owner/{ownerId}")
    public List<Pg> getOwnerPgs(@PathVariable Long ownerId) {

        return pgService.getPgsByOwner(ownerId);
    }

    // ==========================
    // Get PG By Id
    // ==========================
    @GetMapping("/{id}")
    public Pg getPg(@PathVariable Long id) {

        return pgService.getPgById(id);
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
}