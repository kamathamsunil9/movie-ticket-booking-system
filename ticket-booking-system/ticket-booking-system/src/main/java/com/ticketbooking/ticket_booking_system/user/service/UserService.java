package com.ticketbooking.ticket_booking_system.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ticketbooking.ticket_booking_system.enums.UserRole;
import com.ticketbooking.ticket_booking_system.user.entity.User;
import com.ticketbooking.ticket_booking_system.user.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // 

    // REGISTER 
    public User register(User user) {
        try {
            System.out.println("Registering user: " + user.getEmail());
            
            //  HASH THE PASSWORD before saving
            String hashedPw = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPw);

            // Default role logic
            if (user.getRole() == null) {
                user.setRole(UserRole.USER);
            }
            
            return userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    
    // Login
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            System.out.println("Login failed: User not found");
            return null;
        }

        //  passwordEncoder.matches() instead of .equals()
        // It compares the raw input ("2004") with the hash in DB ($2a$10...)
        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("Login failed: Password mismatch");
            return null;
        }

        return user;
    }
}