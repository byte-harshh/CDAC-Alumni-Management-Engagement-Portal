package com.cdac.alumni.eventservice.repository;

import com.cdac.alumni.eventservice.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // Custom method to find upcoming events easily
    List<Event> findByStatus(String status);
}