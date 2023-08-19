import { Component, OnInit } from '@angular/core';
import { Category } from '../category.interface';
import { Observable, of } from 'rxjs';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categories-display',
  templateUrl: './categories-display.component.html',
  styleUrls: ['./categories-display.component.css']
})
export class CategoriesDisplayComponent implements OnInit {
  categories$: Observable<Category[]> | undefined;
  pagedCategories$: Observable<Category[]> | undefined;
  totalCategories: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, private categoryService: CategoryService) { }

  /**
   * Lifecycle hook: Initializes the component and loads categories.
   */
  ngOnInit() {
    this.loadCategories();

    // Subscribe to category changes to update the list
    this.categoryService.categoriesChanged.subscribe(() => {
      this.loadCategories();
    });
  }

  /**
   * Loads all categories from the category service.
   */
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.totalCategories = categories.length;
      this.categories$ = of(categories);
      this.pagedCategories$ = this.getPaginatedCategories(categories);
    });
  }

  /**
   * Handles page change event.
   * @param event The PageEvent object containing page change information.
   */
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    if (this.categories$) {
      this.pagedCategories$ = this.categories$.pipe(
        map(categories => {
          const startIndex = this.currentPage * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return categories.slice(startIndex, endIndex);
        })
      );
    }
  }

  /**
   * Returns an observable of paginated categories.
   * @param categories The list of categories to paginate.
   * @returns An observable of paginated categories.
   */
  getPaginatedCategories(categories: Category[]): Observable<Category[]> {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return of(categories.slice(startIndex, endIndex));
  }

  /**
   * Deletes a category using the category service.
   * @param categoryId The ID of the category to delete.
   */
  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        this.categoryService.categoriesChanged.emit();
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  /**
   * Handles search event to filter categories based on the search query.
   * @param event The input event containing the search query.
   */
  onSearch(event: any) {
    const query = event.target.value;
    if (this.categories$) {
      this.pagedCategories$ = this.categories$.pipe(
        map(categories => {
          const filteredCategories = categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase())
          );
          this.totalCategories = filteredCategories.length;
          const startIndex = this.currentPage * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return filteredCategories.slice(startIndex, endIndex);
        })
      );
    }
  }
}
