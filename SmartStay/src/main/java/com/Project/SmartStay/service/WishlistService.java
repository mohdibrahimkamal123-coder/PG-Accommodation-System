package com.Project.SmartStay.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.dto.WishlistResponse;
import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Wishlist;
import com.Project.SmartStay.repository.PgRepository;
import com.Project.SmartStay.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private PgRepository pgRepository;

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
    public List<WishlistResponse> getWishlistByUser(Long userId) {

        List<Wishlist> wishlist = wishlistRepository.findByUserId(userId);

        List<WishlistResponse> response = new ArrayList<>();

        for (Wishlist item : wishlist) {

            Pg pg = pgRepository.findById(item.getPgId()).orElse(null);

            if (pg != null) {

                WishlistResponse dto = new WishlistResponse();

                dto.setWishlistId(item.getWishlistId());
                dto.setPgId(pg.getPgId());
                dto.setPgName(pg.getPgName());
                dto.setCity(pg.getCity());
                dto.setRentStarting(pg.getRentStarting());
                dto.setRating(pg.getRating());

                response.add(dto);

            }

        }

        return response;

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