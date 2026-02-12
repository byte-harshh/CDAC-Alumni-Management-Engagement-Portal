package com.cdac.alumni.contentservice.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "contents")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;       // News Headline OR Person Name
    
    @Column(length = 500)
    private String summary;     // Short News Summary OR Testimonial Quote
    
    @Lob
    @Column(length = 5000)
    private String details;     // Full News Article OR Person's Designation/Role
    
    private String imageUrl;    // News Image OR Person's Photo
    
    private String externalLink; // For "Read More" links in Success Stories

    private String type;        // "NEWS", "TESTIMONIAL", "SUCCESS_STORY"
    
    private LocalDate date;     // Date of posting

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getExternalLink() { return externalLink; }
    public void setExternalLink(String externalLink) { this.externalLink = externalLink; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
