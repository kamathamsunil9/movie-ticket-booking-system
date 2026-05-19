package com.ticketbooking.ticket_booking_system.booking.controller;

import com.ticketbooking.ticket_booking_system.booking.entity.Booking;
import com.ticketbooking.ticket_booking_system.booking.entity.Seat;
import com.ticketbooking.ticket_booking_system.booking.entity.Show;
import com.ticketbooking.ticket_booking_system.booking.repository.BookingRepository;
import com.ticketbooking.ticket_booking_system.booking.repository.SeatRepository;
import com.ticketbooking.ticket_booking_system.booking.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingRepository bookingRepository;

    //Add new Show
    @PostMapping("/addShow")
    public Show addShow(@RequestBody Show show){
        return showRepository.save(show);
    }

    //Add seats to show
    @PostMapping("/addSeats")
    public List<Seat> addSeats(@RequestParam int showId, @RequestBody List<String> seatNumbers){
        Show show = showRepository.findById(showId).orElse(null);

        if(show == null){
            throw new RuntimeException("Show not found");
        }

        List<Seat> seats = seatNumbers.stream().map(num -> {
            Seat seat = new Seat();
            seat.setSeatNumber(num);
            seat.setBooked(false);
            seat.setShow(show);
            return seat;
        }).collect(Collectors.toList());

        return seatRepository.saveAll(seats);
    }

    // View all bookings
    @GetMapping("/bookings")
    public List<Booking> getAllBookings(){
        return bookingRepository.findAll();
    }

    // Delete Booking
    @DeleteMapping("/deleteBooking")
    public String deleteBooking(@RequestParam int bookingId){

        if(!bookingRepository.existsById(bookingId)){
            return "Booking not found";
        }

        bookingRepository.deleteById(bookingId);
        return "Booking deleted successfully";
    }

}
