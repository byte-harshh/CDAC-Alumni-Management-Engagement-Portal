package com.cdac.alumni.userservice.service;

import com.cdac.alumni.userservice.entity.User;
import com.cdac.alumni.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional; // Added for data safety

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Folder to store uploaded images locally
    private final String UPLOAD_DIR = "user-images/";
    
    public List<User> getAllAlumni() {
        return userRepository.findByRole("ALUMNI");
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public User loginUser(String email, String rawPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Check if the password matches the encrypted one
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return user;
            }
        }
        return null; // Return null if login fails
    }

    // --- CORRECTED REGISTER METHOD ---
    public User registerUser(User user, MultipartFile file) throws IOException {
        // 1. Validation Checks
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        if (userRepository.existsByPrn(user.getPrn())) {
            throw new RuntimeException("PRN already registered!");
        }

        // 2. Encrypt Password & Set Default Role
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ALUMNI");

        // 3. CRITICAL FIX: Save User FIRST to generate ID and ensure DB insertion
        User savedUser = userRepository.save(user); 

        // 4. Handle File Upload Safely
        // We use try-catch so a file error doesn't roll back the user creation
        if (file != null && !file.isEmpty()) {
            try {
                // Create directory if it doesn't exist
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Generate unique filename using User ID (prevents overwrites)
                String fileName = savedUser.getId() + "_" + file.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                
                // Save file to disk
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                
                // Update the User record with the file path
                savedUser.setProfilePicUrl(fileName);
                userRepository.save(savedUser); // Update DB with image path
                
            } catch (Exception e) {
                // Log the error but DO NOT throw exception (so User stays saved)
                System.err.println("WARNING: User saved, but Profile Image Upload Failed: " + e.getMessage());
            }
        }

        return savedUser;
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // --- NEW METHOD: Update Profile Image ---
    public User updateProfileImage(String email, MultipartFile file) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        if (file != null && !file.isEmpty()) {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename using User ID (prevents overwrites)
            String fileName = user.getId() + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            
            // Save file to disk
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Update the User record with the file path
            user.setProfilePicUrl(fileName);
            return userRepository.save(user);
        }
        return user;
    }
}