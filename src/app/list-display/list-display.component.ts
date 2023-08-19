import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Event } from '../event.interface';
import { Category } from '../category.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { CategoryService } from '../category.service';

/**
 * Represents the list display component responsible for showing events.
 */
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

  constructor(
    private router: Router,
    private dataService: DataService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // Initialize component on initialization
    this.loadEvents();
    this.loadCategories();

    // Subscribe to event changes to update the list
    this.dataService.eventsChanged.subscribe(() => {
      this.loadEvents();
    });
  }

  /**
   * Loads events from the data service.
   */
  loadEvents() {
    this.dataService.getAllEvents().subscribe(events => {
      this.totalEvents = events.length;
      this.events$ = of(events);
      this.updatePagedEvents(events);
    });
  }

  /**
   * Loads categories from the category service.
   */
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.allCategories = categories;
    });
  }

  /**
   * Handles page change event.
   * @param event The PageEvent object containing page change information.
   */
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedEvents();
  }

  /**
   * Handles search query change event.
   */
  onSearch() {
    this.updatePagedEvents();
  }

  /**
   * Handles category change event.
   */
  onCategoryChange() {
    this.updatePagedEvents();
  }

  /**
   * Updates paged events based on filters and pagination.
   * @param events Optional parameter, if provided, updates paged events using these events.
   */
  updatePagedEvents(events?: Event[]) {
    if (!events) {
      this.pagedEvents$ = this.events$.pipe(
        map(events => this.applyFilters(events))
      );
    } else {
      this.pagedEvents$ = of(this.applyFilters(events));
    }
  }

  /**
   * Applies filters to events based on search query and selected category.
   * @param events The list of events to filter.
   * @returns The filtered list of events.
   */
  applyFilters(events: Event[]): Event[] {
    return events
      .filter(event => event.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      .filter(event => !this.selectedCategory || event.categories.some(cat => cat.id === this.selectedCategory))
      .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  }

  /**
   * Navigates to the edit event page.
   * @param eventId The ID of the event to edit.
   */
  editEvent(eventId: number) {
    this.router.navigate(['/event', eventId, 'edit']);
  }

  /**
   * Navigates to the view event page.
   * @param eventId The ID of the event to view.
   */
  viewEvent(eventId: number) {
    this.router.navigate(['/event', eventId, 'view']);
  }

  /**
   * Deletes an event.
   * @param eventId The ID of the event to delete.
   */
  deleteEvent(eventId: number) {
    this.dataService.deleteEvent(eventId).subscribe(() => {
      this.dataService.eventsChanged.emit();
    });
  }
}
