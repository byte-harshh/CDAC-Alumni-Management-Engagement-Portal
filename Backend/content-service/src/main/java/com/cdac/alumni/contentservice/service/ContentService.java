package com.cdac.alumni.contentservice.service;

import com.cdac.alumni.contentservice.entity.Content;
import com.cdac.alumni.contentservice.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    private final String UPLOAD_DIR = "content-images/";

    public Content createContent(Content content, org.springframework.web.multipart.MultipartFile file) throws java.io.IOException {
        if (content.getDate() == null) {
            content.setDate(LocalDate.now());
        }

        // Save initial content to generate ID
        Content savedContent = contentRepository.save(content);

        if (file != null && !file.isEmpty()) {
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(UPLOAD_DIR);
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }

            String fileName = savedContent.getId() + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path filePath = uploadPath.resolve(fileName);
            
            java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            
            savedContent.setImageUrl(fileName);
            return contentRepository.save(savedContent);
        }

        return savedContent;
    }

    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    public List<Content> getContentByType(String type) {
        return contentRepository.findByType(type);
    }
}