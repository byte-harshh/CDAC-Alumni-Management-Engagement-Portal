package com.cdac.alumni.eventservice.controller;

import com.cdac.alumni.eventservice.entity.Event;
import com.cdac.alumni.eventservice.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    // API to populate your Events.jsx page
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // API for Admin to post new events
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }
    
    // API to view single event details
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // API to RSVP for an event
    @PostMapping("/{id}/rsvp")
    public String rsvpEvent(@PathVariable Long id) {
        // In a real app, we would add the user to the event's attendee list here.
        // For now, we just acknowledge the request.
        return "RSVP Successful";
    }
}