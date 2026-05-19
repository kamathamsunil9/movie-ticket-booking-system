package com.ticketbooking.ticket_booking_system.booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketbooking.ticket_booking_system.booking.entity.Booking;
import com.ticketbooking.ticket_booking_system.booking.entity.Seat;
import com.ticketbooking.ticket_booking_system.booking.service.BookingService;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Test API
    @GetMapping("/test")
    public String test() {
        return "Booking controller working";
    }

    // Get user bookings using email
    @GetMapping("/user/{email}")
    public List<Booking> getBookingHistory(@PathVariable String email) {
        return bookingService.getUserBookingsByEmail(email);
    }

    // Cancel booking
    @DeleteMapping("/cancel")
    public String cancelBooking(@RequestParam int bookingId) {
        return bookingService.cancelBooking(bookingId);
    }

    // Booking API
    @PostMapping("/book")
    public String bookSeats(
            @RequestParam String email,
            @RequestParam int showId,
            @RequestBody List<String> seats
    ) {
        return bookingService.bookSeatsByEmail(email, showId, seats);
    }

    // Get ONLY booked seats
    @GetMapping("/show/{showId}/seats")
    public List<String> getBookedSeats(@PathVariable Long showId) {
        return bookingService.getBookedSeats(showId);
    }

    // Get ALL seats with booked status
    @GetMapping("/show/{showId}/all-seats")
    public List<Seat> getAllSeats(@PathVariable Long showId) {
        return bookingService.getAllSeats(showId);
    }
}