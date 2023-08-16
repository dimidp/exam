import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllCategories() {
    return this.http.get(`${this.config.baseURL}/${this.config.user}/categories`);
  }

  createCategory(name: string) {
    const category = { name };
    return this.http.post(`${this.config.baseURL}/${this.config.user}/categories`, category);
  }

  getCategoryByID(categoryId: number) {
    return this.http.get(`${this.config.baseURL}/${this.config.user}/categories/${categoryId}`);
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.config.baseURL}/${this.config.user}/categories/${categoryId}`);
  }

  addEventToCategory(categoryId: number, eventId: number) {
    return this.http.post(`${this.config.baseURL}/${this.config.user}/categories/${categoryId}/${eventId}`, {});
  }

  removeEventFromCategory(categoryId: number, eventId: number) {
    return this.http.delete(`${this.config.baseURL}/${this.config.user}/categories/${categoryId}/${eventId}`);
  }
}
