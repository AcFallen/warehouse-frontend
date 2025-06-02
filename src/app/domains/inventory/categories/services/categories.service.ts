import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { CategoriesResponse } from '../types/api-response.type';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl; // TODO: Move to environment

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
