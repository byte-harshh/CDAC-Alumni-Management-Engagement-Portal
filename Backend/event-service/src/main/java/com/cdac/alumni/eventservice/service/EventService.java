package com.cdac.alumni.eventservice.service;

import com.cdac.alumni.eventservice.entity.Event;
import com.cdac.alumni.eventservice.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event createEvent(Event event) {
        // Default status if not provided
        if (event.getStatus() == null) {
            event.setStatus("Upcoming");
        }
        return eventRepository.save(event);
    }
    
    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }
}