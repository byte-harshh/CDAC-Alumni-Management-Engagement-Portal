package com.cdac.alumni.jobservice.service;

import com.cdac.alumni.jobservice.entity.Application;
import com.cdac.alumni.jobservice.entity.Job;
import com.cdac.alumni.jobservice.repository.ApplicationRepository;
import com.cdac.alumni.jobservice.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    private final String RESUME_DIR = "resume-uploads/";

    // --- JOB METHODS ---
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job postJob(Job job) {
        return jobRepository.save(job);
    }

    // --- APPLICATION METHODS ---
    public void applyForJob(Long jobId, Long userId, MultipartFile resumeFile) throws IOException {
        // 1. Save Resume File Locally
        Path uploadPath = Paths.get(RESUME_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = UUID.randomUUID().toString() + "_" + resumeFile.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(resumeFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 2. Save Application to DB
        Application app = new Application();
        app.setJobId(jobId);
        app.setUserId(userId); // Passed from controller (mocked or from token)
        app.setResumeUrl(fileName);
        app.setStatus("Applied");

        applicationRepository.save(app);
    }
}