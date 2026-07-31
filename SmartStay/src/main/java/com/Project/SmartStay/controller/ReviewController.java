package com.Project.SmartStay.controller;

import java.util.List;
import com.Project.SmartStay.dto.ReviewResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Project.SmartStay.entity.Review;
import com.Project.SmartStay.service.ReviewService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public Review addReview(@Valid @RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @GetMapping("/pg/{pgId}")
    public List<ReviewResponse> getReviewsByPg(@PathVariable Long pgId) {

        return reviewService.getReviewsByPg(pgId);

    }

    @GetMapping("/user/{userId}")
    public List<Review> getReviewsByUser(@PathVariable Long userId) {
        return reviewService.getReviewsByUser(userId);
    }
    
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {

        return reviewService.deleteReview(id);
    }
}