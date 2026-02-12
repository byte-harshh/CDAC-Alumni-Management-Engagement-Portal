package com.cdac.alumni.userservice.repository;

import com.cdac.alumni.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
    boolean existsByPrn(String prn);
    
    // NEW: Find all users with a specific role (e.g., "ALUMNI")
    List<User> findByRole(String role);
}
