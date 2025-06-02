import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoriesService } from '../../services/categories.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Category } from '../../models/category.model';

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
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  // Signals para estado reactivo
  private rawData = signal<Category[]>([]); // Datos sin filtrar del servidor
  totalItems = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  loading = signal(false);
  error = signal<string | null>(null);

  // Signal para el filtro
  filterValue = signal<string>('');

  // Computed property para datos filtrados
  dataSource = computed(() => {
    const data = this.rawData();
    const filter = this.filterValue().toLowerCase().trim();

    if (!filter) {
      return data;
    }

    return data.filter(
      (category) =>
        category.name.toLowerCase().includes(filter) ||
        category.description.toLowerCase().includes(filter) ||
        (category.isActive ? 'activo' : 'inactivo').includes(filter)
    );
  });

  // Computed para total de items filtrados
  filteredTotalItems = computed(() => this.dataSource().length);

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
            this.rawData.set(response.data); // Guardamos datos sin filtrar
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

  // Método para aplicar filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue.set(filterValue);

    // Reset pagination cuando se filtra
    this.currentPage.set(1);
  }

  // Método para limpiar filtro
  clearFilter() {
    this.filterValue.set('');
    this.currentPage.set(1);
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
