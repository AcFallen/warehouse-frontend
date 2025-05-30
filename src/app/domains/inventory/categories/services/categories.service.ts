import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:7000'; // TODO: Move to environment

  getCategories(
    page: number = 1,
    limit: number = 10
  ): Observable<CategoriesResponse> {
    return this.http
      .get<CategoriesResponse>(
        `${this.apiUrl}/categories?page=${page}&limit=${limit}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    console.error('CategoriesService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}
