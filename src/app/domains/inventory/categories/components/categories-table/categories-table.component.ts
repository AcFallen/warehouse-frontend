import { Component, OnInit, inject, signal, computed } from '@angular/core';
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
  private readonly categoriesService = inject(CategoriesService);

  // Signals para estado reactivo
  dataSource = signal<Category[]>([]);
  totalItems = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  loading = signal(false);
  error = signal<string | null>(null);

  // Computed properties
  displayedColumns = [
    'id',
    'name',
    'description',
    'isActive',
    'createdAt',
    'actions',
  ];

  // Computed para el número de fila
  getRowNumber = computed(() => {
    return (index: number) =>
      (this.currentPage() - 1) * this.pageSize() + index + 1;
  });

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading.set(true);
    this.error.set(null);

    this.categoriesService
      .getCategories(this.currentPage(), this.pageSize())
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.dataSource.set(response.data);
            this.totalItems.set(response.pagination.total);
          } else {
            this.error.set(response.message || 'Error desconocido');
          }
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.error.set('Error de conexión con el servidor');
          this.loading.set(false);
        },
      });
  }

  onPageChange(event: any) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
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
}
