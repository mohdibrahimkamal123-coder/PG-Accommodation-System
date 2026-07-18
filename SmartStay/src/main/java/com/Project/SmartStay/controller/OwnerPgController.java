package com.Project.SmartStay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.service.PgService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/owner/pgs")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnerPgController {

    @Autowired
    private PgService pgService;

    // Add PG
    @PostMapping
    public Pg addPg(@Valid @RequestBody Pg pg) {

        return pgService.addPg(pg);

    }

    // Get All PGs of Owner
    @GetMapping("/owner/{ownerId}")
    public List<Pg> getOwnerPgs(
            @PathVariable Long ownerId) {

        return pgService.getPgsByOwner(ownerId);

    }

    // Get PG by Id
    @GetMapping("/{id}")
    public Pg getPg(
            @PathVariable Long id) {

        return pgService.getPgById(id);

    }

    // Update PG
    @PutMapping("/{id}")
    public Pg updatePg(
            @PathVariable Long id,
            @Valid @RequestBody Pg pg) {

        return pgService.updatePg(id, pg);

    }

    // Delete PG
    @DeleteMapping("/{id}")
    public String deletePg(
            @PathVariable Long id) {

        return pgService.deletePg(id);

    }

}