import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: string; // UUID string, no number
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: string;
  limit: string;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  message: string;
  pagination: Pagination;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'http://localhost:7000';

  constructor(private http: HttpClient) {}

  getCategories(
    page: number = 1,
    limit: number = 10
  ): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(
      `${this.apiUrl}/categories?page=${page}&limit=${limit}`
    );
  }
}
