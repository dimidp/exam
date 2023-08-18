import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Event } from './event.interface';
import { EventCreateData } from './eventCreateData.interface';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  eventsChanged = new EventEmitter<void>

  constructor(private http: HttpClient, private config: ConfigService) { }

  getAllEvents() {
    return this.http.get<Event[]>(`${this.config.baseURL}/${this.config.user}/events`);
  }

  getEventByID(eventID: number) {
    return this.http.get<Event>(`${this.config.baseURL}/${this.config.user}/events/${eventID}`);
  }

  createEvent(eventData: EventCreateData) {
    console.log("TEST2")
    return this.http.post<Event>(`${this.config.baseURL}/${this.config.user}/events`, eventData);
  }

  updateEvent(eventID: number, eventData: Event) {
    return this.http.put<Event>(`${this.config.baseURL}/${this.config.user}/events/${eventID}`, eventData);
  }

  deleteEvent(eventID: number) {
    return this.http.delete<void>(`${this.config.baseURL}/${this.config.user}/events/${eventID}`);
  }
}
