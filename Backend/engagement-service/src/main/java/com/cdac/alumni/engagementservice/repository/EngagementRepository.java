package com.cdac.alumni.engagementservice.repository;

import com.cdac.alumni.engagementservice.entity.Engagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EngagementRepository extends JpaRepository<Engagement, Long> {
    // Find all requests by specific user
    List<Engagement> findByUserId(Long userId);
    
    // Find all pending requests (For Admin Dashboard)
    List<Engagement> findByStatus(String status);
}