package com.ticketbooking.ticket_booking_system.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketbooking.ticket_booking_system.user.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);
    
}
