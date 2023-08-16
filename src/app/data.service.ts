import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Event } from './event.interface'; // Import the Event interface

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllEvents() {
    return this.http.get<Event[]>(`${this.config.baseURL}/${this.config.user}/events`);
  }

  getEventByID(eventID: number) {
    return this.http.get<Event>(`${this.config.baseURL}/${this.config.user}/events/${eventID}`);
  }

  createEvent(eventData: any) {
    return this.http.post<Event>(`${this.config.baseURL}/${this.config.user}/events`, eventData);
  }

  updateEvent(eventID: number, eventData: any) {
    return this.http.put<Event>(`${this.config.baseURL}/${this.config.user}/events/${eventID}`, eventData);
  }

  deleteEvent(eventID: number) {
    return this.http.delete<void>(`${this.config.baseURL}/${this.config.user}/events/${eventID}`);
  }
}
