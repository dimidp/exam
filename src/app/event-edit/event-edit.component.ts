import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Event } from '../event.interface';
import { Category } from '../category.interface';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent {
  event$!: Observable<Event>;
  allCategories: Category[] = [];
  selectedCategoryIds: number[] = [];

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    // Fetch event based on route parameter
    this.event$ = this.route.params.pipe(
      switchMap(params => this.dataService.getEventByID(+params['id']))
    );

    // Load all categories for the category selection
    this.loadAllCategories();
  }

  /**
   * Loads all categories from the category service.
   */
  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.allCategories = categories;
    });
  }

  /**
   * Updates the event with new data and navigates back to the events list.
   * @param event The event with updated data.
   */
  updateEvent(event: Event) {
    event.categories = this.selectedCategoryIds.map(id => this.allCategories.find(category => category.id === id)!);
    this.dataService.updateEvent(event.id, event).subscribe(() => {
      this.router.navigate(['/events']);
    });
  }

  /**
   * Toggles the selection of a category.
   * @param categoryId The ID of the category to toggle.
   */
  toggleCategory(categoryId: number) {
    if (this.selectedCategoryIds.includes(categoryId)) {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== categoryId);
    } else {
      this.selectedCategoryIds.push(categoryId);
    }
  }
}
