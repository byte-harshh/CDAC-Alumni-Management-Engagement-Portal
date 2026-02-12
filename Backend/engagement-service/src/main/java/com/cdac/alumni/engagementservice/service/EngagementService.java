package com.cdac.alumni.engagementservice.service;

import com.cdac.alumni.engagementservice.entity.Engagement;
import com.cdac.alumni.engagementservice.repository.EngagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EngagementService {

    @Autowired
    private EngagementRepository engagementRepository;

    public Engagement submitRequest(Engagement engagement) {
        engagement.setStatus("PENDING");
        engagement.setRequestDate(LocalDateTime.now());
        return engagementRepository.save(engagement);
    }

    public List<Engagement> getAllRequests() {
        return engagementRepository.findAll();
    }
    
    public List<Engagement> getPendingRequests() {
        return engagementRepository.findByStatus("PENDING");
    }
}
