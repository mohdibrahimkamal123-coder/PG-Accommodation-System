package com.Project.SmartStay.repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.Project.SmartStay.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByPgId(Long pgId);

    List<Review> findByUserId(Long userId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.pgId = :pgId")
    Double getAverageRatingByPgId(Long pgId);
}