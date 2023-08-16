import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Event } from '../event.interface'; // Import the Event interface
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  events$: Observable<Event[]> | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.events$ = this.dataService.getAllEvents();
  }

  deleteEvent(eventId: number) {
    this.dataService.deleteEvent(eventId).subscribe(() => {
      // After deletion, reload the events
      this.loadEvents();
    });
  }
}
