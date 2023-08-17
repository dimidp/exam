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
    this.loadEvents();
  }

  loadEvents() {
    this.categories$ = this.categoryService.getAllCategories();
  }

  editCategory(categoryID: number){
  }

}
