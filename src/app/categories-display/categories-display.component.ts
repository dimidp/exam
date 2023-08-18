import { Component } from '@angular/core';
import { Category } from '../category.interface';
import { Observable } from 'rxjs';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-display',
  templateUrl: './categories-display.component.html',
  styleUrls: ['./categories-display.component.css']
})
export class CategoriesDisplayComponent {
  categories$: Observable<Category[]> | undefined;

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();

    this.categoryService.categoriesChanged.subscribe(() => {
      this.loadCategories();  // Lade die Kategorien neu, wenn das Ereignis ausgelöst wird
    });
  }

  loadCategories() {
    this.categories$ = this.categoryService.getAllCategories();
  }

  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        this.categoryService.categoriesChanged.emit();  

      },
      (error) => {
        console.error('Error deleting category:', error); // Optional: Fehlerbehandlung
      }
    );
  }
  
 
}
