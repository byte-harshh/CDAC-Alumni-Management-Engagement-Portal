package com.cdac.alumni.jobservice.controller;

import com.cdac.alumni.jobservice.entity.Job;
import com.cdac.alumni.jobservice.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @PostMapping
    public Job postJob(@RequestBody Job job) {
        return jobService.postJob(job);
    }

    @PostMapping("/{jobId}/apply")
    public ResponseEntity<?> applyForJob(
            @PathVariable Long jobId,
            @RequestParam("resume") MultipartFile resume,
            // For now, we assume user ID is 1. In real app, extract from JWT Token.
            @RequestParam(value = "userId", defaultValue = "1") Long userId 
    ) {
        try {
            jobService.applyForJob(jobId, userId, resume);
            return ResponseEntity.ok("Application Submitted Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Application Failed");
        }
    }
}