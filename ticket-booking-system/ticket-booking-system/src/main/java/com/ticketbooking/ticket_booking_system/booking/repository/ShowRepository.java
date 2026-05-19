package com.ticketbooking.ticket_booking_system.booking.repository;

import com.ticketbooking.ticket_booking_system.booking.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<Show, Integer> {
}