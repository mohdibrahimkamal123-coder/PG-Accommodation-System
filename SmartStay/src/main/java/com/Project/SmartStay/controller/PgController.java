package com.Project.SmartStay.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.service.PgService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pgs")
@CrossOrigin(origins = "http://localhost:5173")
public class PgController {

    @Autowired
    private PgService pgService;

    @PostMapping
    public Pg addPg(@Valid @RequestBody Pg pg) {
        return pgService.addPg(pg);
    }

    @GetMapping
    public List<Pg> getAllPgs() {
        return pgService.getAllPgs();
    }

    @GetMapping("/{id}")
    public Pg getPgById(@PathVariable Long id) {
        return pgService.getPgById(id);
    }

    @GetMapping("/city/{city}")
    public List<Pg> getPgsByCity(@PathVariable String city) {
        return pgService.getPgsByCity(city);
    }
    
    @GetMapping("/top-rated")
    public List<Pg> getTopRatedPgs() {
        return pgService.getTopRatedPgs();
    }
    
    @PutMapping("/{id}")
    public Pg updatePg(@PathVariable Long id,
    		@Valid @RequestBody Pg pg) {

        return pgService.updatePg(id, pg);
    }

    @DeleteMapping("/{id}")
    public String deletePg(@PathVariable Long id) {

        return pgService.deletePg(id);
    }
    @GetMapping("/rent/{rent}")
    public List<Pg> getPgsByRent(
            @PathVariable Double rent) {

        return pgService.getPgsByRent(rent);
    }
    
    @GetMapping("/wifi")
    public List<Pg> getWifiPgs() {

        return pgService.getWifiPgs();
    }
    @GetMapping("/food")
    public List<Pg> getFoodPgs() {

        return pgService.getFoodPgs();
    }
    
}