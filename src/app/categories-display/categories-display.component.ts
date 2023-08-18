import { Component, OnInit } from '@angular/core';
import { Category } from '../category.interface';
import { Observable, of } from 'rxjs'; // Importieren Sie "of" hier
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators'; // Importieren Sie "map" hier

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

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();

    this.categoryService.categoriesChanged.subscribe(() => {
      this.loadCategories();
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.totalCategories = categories.length;
      this.categories$ = of(categories);
      this.pagedCategories$ = this.getPaginatedCategories(categories);
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    if (this.categories$) { // Überprüfen Sie, ob this.categories$ definiert ist
      this.pagedCategories$ = this.categories$.pipe(
        map(categories => {
          const startIndex = this.currentPage * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return categories.slice(startIndex, endIndex);
        })
      );
    }
  }
  

  getPaginatedCategories(categories: Category[]): Observable<Category[]> {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return of(categories.slice(startIndex, endIndex));
  }

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
}
