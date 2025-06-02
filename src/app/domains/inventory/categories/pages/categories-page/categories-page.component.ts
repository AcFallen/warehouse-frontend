import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import {
  CategoriesTableComponent,
  FilterEvent,
  ActionEvent,
} from '../../components/categories-table/categories-table.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories-page',
  imports: [CategoriesTableComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
})
export class CategoriesPageComponent implements OnInit {
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

  // Event handlers para el table component
  onFilterChange(event: FilterEvent) {
    this.filterValue.set(event.filterValue);
    // Reset pagination cuando se filtra
    this.currentPage.set(1);
  }

  onFilterClear() {
    this.filterValue.set('');
    this.currentPage.set(1);
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadCategories();
  }

  onActionEvent(event: ActionEvent) {
    switch (event.action) {
      case 'add':
        this.handleAddCategory();
        break;
      case 'edit':
        this.handleEditCategory(event.category!);
        break;
      case 'delete':
        this.handleDeleteCategory(event.category!);
        break;
    }
  }

  // Action handlers
  private handleAddCategory() {
    console.log('Add category action triggered');
    // TODO: Implementar modal/formulario para agregar categoría
  }

  private handleEditCategory(category: Category) {
    console.log('Edit category action triggered for:', category);
    // TODO: Implementar modal/formulario para editar categoría
  }

  private handleDeleteCategory(category: Category) {
    console.log('Delete category action triggered for:', category);
    // TODO: Implementar confirmación y eliminación de categoría
  }
}
