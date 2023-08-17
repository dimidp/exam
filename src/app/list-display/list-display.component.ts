import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Event } from '../event.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  viewEvent(eventId: number) {
    this.router.navigate(['/event', eventId, 'view']); 
  }

  deleteEvent(eventId: number) {
    this.dataService.deleteEvent(eventId).subscribe(() => {
      this.loadEvents();
    });
  }
}
