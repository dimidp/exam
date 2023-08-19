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
    // Initialize the category form with a form control and validator
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  /**
   * Handles form submission when the user submits the category form.
   * Creates a new category using the provided name.
   */
  onSubmit() {
    if (this.categoryForm.valid) {
      // Extract the category name from the form value
      const categoryName: string = this.categoryForm.value.name;

      // Create the category using the category service
      this.categoryService.createCategory(categoryName).subscribe(
        (createdCategory) => {
          console.log('Category created:', createdCategory);

          // Reset the form after successful category creation
          this.categoryForm.reset();

          // Emit an event to notify other components about category changes
          this.categoryService.categoriesChanged.emit();
        },
        (error) => {
          console.error('Error creating category:', error);
        }
      );
    }
  }
}
