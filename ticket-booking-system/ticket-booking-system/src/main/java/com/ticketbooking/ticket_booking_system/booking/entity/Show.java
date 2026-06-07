package com.ticketbooking.ticket_booking_system.booking.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "shows")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "theater_name", nullable = false)
    private String theater;

    @Column(name = "show_time")
    private String showTime;

    @Column(name = "movie_name")
    private String movieName;

    
    @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Seat> seats;

    
    public Show() {
    }

    
    public Show(String theater, String showTime, String movieName) {
    this.theater = theater;
    this.showTime = showTime;
    this.movieName = movieName;
}
    

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTheater() {
        return theater;
    }

    public void setTheater(String theater) {
        this.theater = theater;
    }

    public String getShowTime() {
    return showTime;
}

    public void setShowTime(String showTime) {
    this.showTime = showTime;
}

    public String getMovieName() {
    return movieName;
}

    public void setMovieName(String movieName) {
    this.movieName = movieName;
}

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }
}