import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Event } from '../event.interface'; // Import the Event interface
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  events$: Observable<Event[]> | undefined;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.events$ = this.dataService.getAllEvents();
  }
  editEvent(eventId: number) {
    this.router.navigate(['/event', eventId, 'edit']);
  }
  

  deleteEvent(eventId: number) {
    this.dataService.deleteEvent(eventId).subscribe(() => {
      this.loadEvents();
    });
  }
}
