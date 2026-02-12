package com.cdac.alumni.contentservice.controller;

import com.cdac.alumni.contentservice.entity.Content;
import com.cdac.alumni.contentservice.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/content")
public class ContentController {

    @Autowired
    private ContentService contentService;

    // POST /content (To add News or Testimonials)
    // POST /content (To add News or Testimonials)
    @PostMapping
    public Content addContent(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "summary", required = false) String summary,
            @RequestParam(value = "content", required = false) String details, // Frontend sends 'content', mapped to 'details'
            @RequestParam(value = "type", required = true) String type,
            @RequestParam(value = "image", required = false) org.springframework.web.multipart.MultipartFile file
    ) throws java.io.IOException {
        Content content = new Content();
        content.setTitle(title);
        content.setSummary(summary);
        content.setDetails(details);
        content.setType(type);
        
        return contentService.createContent(content, file);
    }

    // GET /content?type=NEWS  (Or SUCCESS_STORY, TESTIMONIAL)
    @GetMapping
    public List<Content> getContent(@RequestParam(value = "type", required = false) String type) {
        if (type != null) {
            return contentService.getContentByType(type);
        }
        return contentService.getAllContent();
    }
}