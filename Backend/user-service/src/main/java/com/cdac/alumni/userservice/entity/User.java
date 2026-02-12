package com.cdac.alumni.userservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Matches 'name' from Register.jsx and DB column
    private String name;

    // Matches 'email'
    @Column(unique = true, nullable = false)
    private String email;

    // Matches 'phone'
    private String phone;

    // Matches 'prn' - Unique Identifier
    @Column(unique = true, nullable = false)
    private String prn;

    // Matches 'course' (e.g., PG-DAC, PG-DBDA)
    private String course;

    // Matches 'batch_year' (e.g., Feb-2023)
    private String batch;

    // Matches 'placed_company'
    private String placedCompany;

    // Matches 'current_company'
    private String currentCompany;

    // Matches 'password'
    private String password;

    // To store the uploaded file path
    private String profilePicUrl;

    // Default role (will set to "ALUMNI" by default in logic)
    private String role;

    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPrn() { return prn; }
    public void setPrn(String prn) { this.prn = prn; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }

    public String getPlacedCompany() { return placedCompany; }
    public void setPlacedCompany(String placedCompany) { this.placedCompany = placedCompany; }

    public String getCurrentCompany() { return currentCompany; }
    public void setCurrentCompany(String currentCompany) { this.currentCompany = currentCompany; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getProfilePicUrl() { return profilePicUrl; }
    public void setProfilePicUrl(String profilePicUrl) { this.profilePicUrl = profilePicUrl; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}