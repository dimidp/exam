import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = "http://dhbw.radicalsimplicity.com/categories/";

  constructor() {}

  getAllCategories() {}

  getCategoryByID(ID: number) {}

  editCategory(ID: number) {}

  addCategory() {}

  deleteCategory(ID: number) {}

}
