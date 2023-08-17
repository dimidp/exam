import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-user-input',
  templateUrl: './category-user-input.component.html',
  styleUrls: ['./category-user-input.component.css']
})
export class CategoryUserInputComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryName: string = this.categoryForm.value.name; // Ensure it's of type string
      this.categoryService.createCategory(categoryName).subscribe(
        (createdCategory) => {
          console.log('Category created:', createdCategory);
          // Reset the form after successful creation
          this.categoryForm.reset();
        },
        (error) => {
          console.error('Error creating category:', error);
          // You can handle the error, display an error message, etc.
        }
      );
    }
  }
}
