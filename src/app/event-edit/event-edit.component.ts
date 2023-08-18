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

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router, private dataService: DataService) {
    this.event$ = this.route.params.pipe(
      switchMap(params => this.dataService.getEventByID(+params['id']))
    );

    this.loadAllCategories();
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.allCategories = categories;
    });
  }

  updateEvent(event: Event) {
    event.categories = this.selectedCategoryIds.map(id => this.allCategories.find(category => category.id === id)!);
    this.dataService.updateEvent(event.id, event).subscribe(() => {
      this.router.navigate(['/events']);
    });
  }

  toggleCategory(categoryId: number) {
    if (this.selectedCategoryIds.includes(categoryId)) {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== categoryId);
    } else {
      this.selectedCategoryIds.push(categoryId);
    }
  }
}
