package com.Project.SmartStay.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.entity.Wishlist;
import com.Project.SmartStay.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    // Add PG to Wishlist
    public Wishlist addToWishlist(Wishlist wishlist) {

        boolean exists = wishlistRepository.existsByUserIdAndPgId(
                wishlist.getUserId(),
                wishlist.getPgId());

        if (exists) {
            throw new RuntimeException("PG is already in your wishlist.");
        }

        return wishlistRepository.save(wishlist);
    }

    // Get Wishlist by User
    public List<Wishlist> getWishlistByUser(Long userId) {

        return wishlistRepository.findByUserId(userId);

    }

    // Remove from Wishlist
    public String removeFromWishlist(Long wishlistId) {

        if (!wishlistRepository.existsById(wishlistId)) {
            throw new RuntimeException("Wishlist item not found.");
        }

        wishlistRepository.deleteById(wishlistId);

        return "Removed from wishlist successfully.";

    }

}