package com.ticketbooking.ticket_booking_system.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketbooking.ticket_booking_system.booking.entity.Seat;

public interface SeatRepository extends JpaRepository<Seat, Integer> {

    List<Seat> findByShow_IdAndSeatNumberIn(int showId, List<String> seatNumbers);
}