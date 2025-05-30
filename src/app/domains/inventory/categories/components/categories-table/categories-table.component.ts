import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CategoriesService, Category } from '../../services/categories.service';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit {
  dataSource: Category[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'isActive',
    'createdAt',
    'actions',
  ];
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  loading = false;
  error: string | null = null;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.error = null;

    this.categoriesService
      .getCategories(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.dataSource = response.data;
            this.totalItems = response.pagination.total;
          } else {
            this.error = response.message || 'Error desconocido';
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.error = 'Error de conexión con el servidor';
          this.loading = false;
        },
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadCategories();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
}
