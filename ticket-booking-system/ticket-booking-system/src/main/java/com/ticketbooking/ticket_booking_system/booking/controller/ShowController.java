package com.ticketbooking.ticket_booking_system.booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketbooking.ticket_booking_system.booking.entity.Show;
import com.ticketbooking.ticket_booking_system.booking.repository.ShowRepository;

@RestController
public class ShowController {

    @Autowired
    private ShowRepository showRepository;

    @GetMapping("/shows")
    public List<Show> getAllShows() {
        return showRepository.findAll();
    }
}