import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private accountName="3412747"
  private baseURL=("http://dhbw.radicalsimplicity.com/calendar/"+this.accountName)


  constructor(private http: HttpClient) {}

  getAllEvents(user: string) {
    return this.http.get(`${this.baseURL}${user}/events`);
  }

  getEventByID(user: string, eventID: number) {
    return this.http.get(`${this.baseURL}${user}/events/${eventID}`);
  }

  createEvent(user: string, eventData: any) {
    return this.http.post(`${this.baseURL}${user}/events`, eventData);
  }

  updateEvent(user: string, eventID: number, eventData: any) {
    return this.http.put(`${this.baseURL}${user}/events/${eventID}`, eventData);
  }

  deleteEvent(user: string, eventID: number) {
    return this.http.delete(`${this.baseURL}${user}/events/${eventID}`);
  }

  addImage(ID: number){}

  removeImage(ID:number){}



}
