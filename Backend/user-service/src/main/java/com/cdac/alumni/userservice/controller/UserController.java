package com.cdac.alumni.userservice.controller;

import com.cdac.alumni.userservice.entity.User;
import com.cdac.alumni.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // API for Admin (List all Users)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // API for Members (List all Alumni) - Preserving functionality on a new path
    @GetMapping("/alumni")
    public List<User> getAllAlumni() {
        return userService.getAllAlumni();
    }

    // API for Profile (Get User by Email)
    @GetMapping("/profile/{email}")
    public User getUserProfileByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    // API for Admin.jsx (View specific user profile by ID)
    @GetMapping("/{id}")
    public User getUserProfile(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // API for Admin.jsx (Delete/Block User)
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    // API to Upload/Update Profile Image from Profile Page
    @PostMapping("/profile/image")
    public User uploadProfileImage(@RequestParam("email") String email, 
                                 @RequestParam("file") org.springframework.web.multipart.MultipartFile file) throws java.io.IOException {
        return userService.updateProfileImage(email, file);
    }
}