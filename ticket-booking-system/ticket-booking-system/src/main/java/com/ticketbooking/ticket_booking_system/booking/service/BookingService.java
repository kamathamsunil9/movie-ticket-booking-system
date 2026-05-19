package com.ticketbooking.ticket_booking_system.booking.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ticketbooking.ticket_booking_system.booking.entity.Booking;
import com.ticketbooking.ticket_booking_system.booking.entity.Seat;
import com.ticketbooking.ticket_booking_system.booking.entity.Show;
import com.ticketbooking.ticket_booking_system.booking.repository.BookingRepository;
import com.ticketbooking.ticket_booking_system.booking.repository.SeatRepository;
import com.ticketbooking.ticket_booking_system.booking.repository.ShowRepository;
import com.ticketbooking.ticket_booking_system.user.entity.User;
import com.ticketbooking.ticket_booking_system.user.repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private UserRepository userRepository;

    
    public List<Booking> getUserBookings(int userId) {
        return bookingRepository.findByUserId(userId);
    }

    // get bookings using email
    public List<Booking> getUserBookingsByEmail(String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return new ArrayList<>();
        }

        return bookingRepository.findByUserId(user.getId());
    }

    // Booking API
    @Transactional
    public String bookSeats(int userId, int showId, List<String> seatNumbers) {

        List<Seat> seats = seatRepository.findByShow_IdAndSeatNumberIn(showId, seatNumbers);

        if (seats.isEmpty()) {
            return "Seats not found";
        }

        for (Seat seat : seats) {
            if (seat.isBooked()) {
                return "Seat already booked: " + seat.getSeatNumber();
            }
        }

        for (Seat seat : seats) {
            seat.setBooked(true);
        }

        seatRepository.saveAll(seats);

        User user = userRepository.findById(userId).orElse(null);
        Show show = showRepository.findById(showId).orElse(null);

        if (user == null || show == null) {
            return "User or Show not found";
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setSeats(seats);
        booking.setShow(show);

        bookingRepository.save(booking);

        return "Booking Successful";
    }

    // BOOKING USING EMAIL
    @Transactional
    public String bookSeatsByEmail(String email, int showId, List<String> seatNumbers) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User not found";
        }

        // reuse existing logic
        return bookSeats(user.getId(), showId, seatNumbers);
    }

    // Cancel booking
    @Transactional
    public String cancelBooking(int bookingId) {

        Booking booking = bookingRepository.findById(bookingId).orElse(null);

        if (booking == null) {
            return "Booking not found";
        }

        for (Seat seat : booking.getSeats()) {
            seat.setBooked(false);
        }

        seatRepository.saveAll(booking.getSeats());

        bookingRepository.delete(booking);

        return "Booking Cancelled";
    }

    // Get booked seats only
    public List<String> getBookedSeats(Long showId) {

        List<Booking> bookings = bookingRepository.findByShowId(showId);

        List<String> seats = new ArrayList<>();

        for (Booking b : bookings) {
            for (Seat s : b.getSeats()) {
                seats.add(s.getSeatNumber());
            }
        }

        return seats;
    }

    // Get ALL seats with booked status
    public List<Seat> getAllSeats(Long showId) {

        Show show = showRepository.findById(showId.intValue()).orElse(null);

        if (show == null) {
            return new ArrayList<>();
        }

        return show.getSeats();
    }
}