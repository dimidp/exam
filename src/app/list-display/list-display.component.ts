import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Event } from '../event.interface';
import { Category } from '../category.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { CategoryService } from '../category.service';

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

  searchQuery: string = '';
  selectedCategory: number | undefined;
  allCategories: Category[] = [];

  constructor(private router: Router, private dataService: DataService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadEvents();
    this.loadCategories();

    this.dataService.eventsChanged.subscribe(() => {
      this.loadEvents();
    });
  }

  loadEvents() {
    this.dataService.getAllEvents().subscribe(events => {
      this.totalEvents = events.length;
      this.events$ = of(events);
      this.updatePagedEvents(events);
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.allCategories = categories;
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedEvents();
  }

  onSearch() { // Hier ist die korrekte Methode
    this.updatePagedEvents();
  }

  onCategoryChange() {
    this.updatePagedEvents();
  }

  updatePagedEvents(events?: Event[]) {
    if (!events) {
      this.pagedEvents$ = this.events$.pipe(
        map(events => this.applyFilters(events))
      );
    } else {
      this.pagedEvents$ = of(this.applyFilters(events));
    }
  }

  applyFilters(events: Event[]): Event[] {
    return events
      .filter(event => event.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      .filter(event => !this.selectedCategory || event.categories.some(cat => cat.id === this.selectedCategory))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
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
