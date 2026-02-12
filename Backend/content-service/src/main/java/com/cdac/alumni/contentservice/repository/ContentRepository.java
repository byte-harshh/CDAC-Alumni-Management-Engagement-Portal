package com.cdac.alumni.contentservice.repository;

import com.cdac.alumni.contentservice.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    // To fetch specific types (e.g., only NEWS or only TESTIMONIALS)
    List<Content> findByType(String type);
}