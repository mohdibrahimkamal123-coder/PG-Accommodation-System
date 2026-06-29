package com.Project.SmartStay.service;

import java.util.List;
import com.Project.SmartStay.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.SmartStay.entity.Pg;
import com.Project.SmartStay.entity.Review;
import com.Project.SmartStay.repository.PgRepository;
import com.Project.SmartStay.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private PgRepository pgRepository;

//    public Review addReview(Review review) {
//        return reviewRepository.save(review);
//    }
    
    public Review addReview(Review review) {

        Review savedReview = reviewRepository.save(review);

        Double avgRating =
                reviewRepository.getAverageRatingByPgId(
                        review.getPgId());

        Pg pg = pgRepository
                .findById(review.getPgId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("PG Not Found"));

        pg.setRating(avgRating);

        pgRepository.save(pg);

        return savedReview;
    }

    public List<Review> getReviewsByPg(Long pgId) {
        return reviewRepository.findByPgId(pgId);
    }

    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId);
    }
    
    public String deleteReview(Long id) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review Not Found"));

        reviewRepository.delete(review);

        return "Review Deleted Successfully";
    }
}