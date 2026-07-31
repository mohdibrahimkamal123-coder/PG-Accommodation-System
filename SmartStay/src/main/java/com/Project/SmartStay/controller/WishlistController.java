package com.Project.SmartStay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.dto.WishlistResponse;
import com.Project.SmartStay.entity.Wishlist;
import com.Project.SmartStay.service.WishlistService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    // Add to Wishlist
    @PostMapping
    public Wishlist addToWishlist(@Valid @RequestBody Wishlist wishlist) {

        return wishlistService.addToWishlist(wishlist);

    }

    // Get Wishlist by User
    @GetMapping("/user/{userId}")
    public List<WishlistResponse> getWishlistByUser(@PathVariable Long userId) {

        return wishlistService.getWishlistByUser(userId);

    }

    // Remove from Wishlist
    @DeleteMapping("/{wishlistId}")
    public String removeFromWishlist(@PathVariable Long wishlistId) {

        return wishlistService.removeFromWishlist(wishlistId);

    }

}