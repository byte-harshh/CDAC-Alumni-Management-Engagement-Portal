package com.cdac.alumni.userservice.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.alumni.userservice.entity.User;
import com.cdac.alumni.userservice.service.UserService;

@RestController
@RequestMapping("/auth")
// @CrossOrigin(origins = "*") // REMOVED: Gateway handles CORS. Duplication causes errors.
public class AuthController {

    @Autowired
    private com.cdac.alumni.userservice.util.JwtUtil jwtUtil;
    
    @Autowired
    private UserService userService;

    // --- LOGIN API ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            // 1. Generate Token
            String token = jwtUtil.generateToken(user.getEmail());

            // 2. Remove password before sending to frontend (Security Best Practice)
            user.setPassword(null);

            // 3. Create Response Object (Token + User Details)
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);

            return ResponseEntity.ok(response);
        } else {
            // Return JSON error so frontend can read 'response.data.message'
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Email or Password"));
        }
    }

    // DTO for Login
    static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    // --- REGISTER API ---
 // ... inside AuthController.java ...

    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<?> registerUser(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("prn") String prn,
            @RequestParam("password") String password,
            @RequestParam(value = "phone", required = false) String phone, // Changed to required=false
            @RequestParam("course") String course,
            @RequestParam("batch_year") String batch,
            @RequestParam(value = "placed_company", required = false) String placedCompany,
            @RequestParam(value = "current_company", required = false) String currentCompany,
            @RequestParam(value = "profile_pic", required = false) MultipartFile file
    ) {
        try {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPrn(prn);
            user.setPassword(password);
            user.setPhone(phone != null ? phone : "");
            user.setCourse(course);
            user.setBatch(batch);
            user.setPlacedCompany(placedCompany != null ? placedCompany : "NA");
            user.setCurrentCompany(currentCompany != null ? currentCompany : "NA");

            User registeredUser = userService.registerUser(user, file);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "User registered successfully", "userId", registeredUser.getId()));

        } catch (Exception e) {
            // 1. PRINT THE REAL ERROR IN CONSOLE
            System.err.println("### REGISTRATION ERROR ###");
            e.printStackTrace(); 
            
            // 2. SAFE ERROR RESPONSE (Handles null messages)
            String errorMessage = (e.getMessage() != null) ? e.getMessage() : "Internal Server Error (Check Console)";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", errorMessage));
        }
    }
}