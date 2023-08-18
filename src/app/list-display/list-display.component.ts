import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Event } from '../event.interface';
import { Observable, of } from 'rxjs'; // Importieren Sie "of" hier
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  events$: Observable<Event[]> = new Observable<Event[]>();
pagedEvents$: Observable<Event[]> = new Observable<Event[]>();

  totalEvents: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.loadEvents();

    this.dataService.eventsChanged.subscribe(() => {
      this.loadEvents();
    });
  }

  loadEvents() {
    this.dataService.getAllEvents().subscribe(events => {
      this.totalEvents = events.length;
      this.events$ = of(events); // Verwenden Sie "of" hier
      this.pagedEvents$ = this.getPaginatedEvents(events); // Setzen Sie pagedEvents$ auf die paginierten Ereignisse
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pagedEvents$ = this.events$.pipe(
      map(events => {
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return events.slice(startIndex, endIndex);
      })
    );
  }

  getPaginatedEvents(events: Event[]): Observable<Event[]> {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return of(events.slice(startIndex, endIndex)); // Verwenden Sie "of" hier
  }

  editEvent(eventId: number) {
    this.router.navigate(['/event', eventId, 'edit']);
  }

  viewEvent(eventId: number) {
    this.router.navigate(['/event', eventId, 'view']);
  }

  deleteEvent(eventId: number) {
    this.dataService.deleteEvent(eventId).subscribe(() => {
      this.dataService.eventsChanged.emit();
    });
  }
}
