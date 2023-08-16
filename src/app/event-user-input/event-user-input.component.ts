import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Event } from '../event.interface'; // Import the Event interface

@Component({
  selector: 'app-event-user-input',
  templateUrl: './event-user-input.component.html',
  styleUrls: ['./event-user-input.component.css']
})
export class EventUserInputComponent implements OnInit {
  events: Event[] = []; // Use the Event interface here

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.dataService.getAllEvents().subscribe(
      (data: Event[]) => { // Use the Event interface for the type
        this.events = data;
        console.log(data);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}
