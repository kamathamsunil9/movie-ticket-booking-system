package com.ticketbooking.ticket_booking_system.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketbooking.ticket_booking_system.booking.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUserId(int userId);
    List<Booking> findByShowId(Long showId);
}