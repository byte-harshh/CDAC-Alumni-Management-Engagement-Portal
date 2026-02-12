package com.cdac.alumni.engagementservice.controller;

import com.cdac.alumni.engagementservice.entity.Engagement;
import com.cdac.alumni.engagementservice.service.EngagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/engage")
public class EngagementController {

    @Autowired
    private EngagementService engagementService;

    // POST /engage (User clicks "Join" or "Contribute")
    @PostMapping
    public Engagement submitRequest(@RequestBody Engagement engagement) {
        return engagementService.submitRequest(engagement);
    }

    // GET /engage (Admin views all requests)
    @GetMapping
    public List<Engagement> getAllRequests() {
        return engagementService.getAllRequests();
    }
}