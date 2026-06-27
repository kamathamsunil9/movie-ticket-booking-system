package com.ticketbooking.ticket_booking_system.auth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketbooking.ticket_booking_system.auth.util.JwtUtil;
import com.ticketbooking.ticket_booking_system.user.entity.User;
import com.ticketbooking.ticket_booking_system.user.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTER API
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        // 1. Fetch user records from database directly by email first
        User dbUser = userService.findByEmail(user.getEmail());

        // 2. If email doesn't exist in system
        if (dbUser == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        // 3. ROLE CHECK (Safe string comparison to bypass reference or type issues)
        String requestedRole = (user.getRole() != null) ? user.getRole().toString() : "";
        String databaseRole = (dbUser.getRole() != null) ? dbUser.getRole().toString() : "";

        if (!requestedRole.isEmpty() && !databaseRole.equalsIgnoreCase(requestedRole)) {
            System.out.println("ROLE MISMATCH CALLED: Request Role: " + requestedRole + ", DB Role: " + databaseRole);

            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid role selected");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        // 4. PASSWORD CHECK
        User authenticatedUser = userService.login(user.getEmail(), user.getPassword());
        if (authenticatedUser == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        // 5. SUCCESSFUL LOGIN -> Create Token using authenticated instance
        String token = jwtUtil.generateToken(
                authenticatedUser.getEmail(),
                authenticatedUser.getRole().name());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}