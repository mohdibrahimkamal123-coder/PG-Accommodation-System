package com.Project.SmartStay.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.dto.ReviewResponse;
import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Review;
import com.Project.SmartStay.entity.User;
import com.Project.SmartStay.exception.ResourceNotFoundException;
import com.Project.SmartStay.repository.PgRepository;
import com.Project.SmartStay.repository.ReviewRepository;
import com.Project.SmartStay.repository.UserRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PgRepository pgRepository;

    // ==========================
    // Add Review
    // ==========================
    public Review addReview(Review review) {

        Review savedReview = reviewRepository.save(review);

        Double avgRating =
                reviewRepository.getAverageRatingByPgId(review.getPgId());

        Pg pg = pgRepository.findById(review.getPgId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("PG Not Found"));

        pg.setRating(avgRating);

        pgRepository.save(pg);

        return savedReview;
    }

    // ==========================
    // Reviews of Particular PG
    // ==========================
    public List<ReviewResponse> getReviewsByPg(Long pgId) {

        List<Review> reviews = reviewRepository.findByPgId(pgId);

        List<ReviewResponse> response = new ArrayList<>();

        for (Review review : reviews) {

            User user = userRepository
                    .findById(review.getUserId())
                    .orElse(null);

            Pg pg = pgRepository
                    .findById(review.getPgId())
                    .orElse(null);

            ReviewResponse dto = new ReviewResponse();

            dto.setReviewId(review.getReviewId());
            dto.setUserId(review.getUserId());
            dto.setPgId(review.getPgId());
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setCreatedAt(review.getCreatedAt());

            if (user != null) {
                dto.setUserName(user.getFullName());
            } else {
                dto.setUserName("Unknown User");
            }

            if (pg != null) {
                dto.setPgName(pg.getPgName());
                dto.setCity(pg.getCity());
            }

            response.add(dto);
        }

        return response;
    }

    // ==========================
    // Top Reviews for Home Page
    // ==========================
    public List<ReviewResponse> getTopReviews() {

        List<Review> reviews =
                reviewRepository.findTop6ByOrderByCreatedAtDesc();

        List<ReviewResponse> response = new ArrayList<>();

        for (Review review : reviews) {

            User user = userRepository
                    .findById(review.getUserId())
                    .orElse(null);

            Pg pg = pgRepository
                    .findById(review.getPgId())
                    .orElse(null);

            ReviewResponse dto = new ReviewResponse();

            dto.setReviewId(review.getReviewId());
            dto.setUserId(review.getUserId());
            dto.setPgId(review.getPgId());
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setCreatedAt(review.getCreatedAt());

            if (user != null) {
                dto.setUserName(user.getFullName());
            } else {
                dto.setUserName("Unknown User");
            }

            if (pg != null) {
                dto.setPgName(pg.getPgName());
                dto.setCity(pg.getCity());
            }

            response.add(dto);
        }

        return response;
    }

    // ==========================
    // Reviews Given By User
    // ==========================
    public List<Review> getReviewsByUser(Long userId) {

        return reviewRepository.findByUserId(userId);
    }

    // ==========================
    // Delete Review
    // ==========================
    public String deleteReview(Long id) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review Not Found"));

        reviewRepository.delete(review);

        return "Review Deleted Successfully";
    }

}