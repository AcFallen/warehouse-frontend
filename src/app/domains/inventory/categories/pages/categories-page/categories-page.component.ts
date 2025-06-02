import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import {
  CategoriesTableComponent,
  FilterEvent,
  ActionEvent,
} from '../../components/categories-table/categories-table.component';
import {
  CategoryFormModalComponent,
  CategoryFormData,
  CategoryFormResult,
} from '../../components/category-form-modal/category-form-modal.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories-page',
  imports: [CategoriesTableComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
})
export class CategoriesPageComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly dialog = inject(MatDialog);

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
    const dialogData: CategoryFormData = {
      mode: 'add',
      title: 'Nueva Categoría',
    };

    const dialogRef = this.dialog.open(CategoryFormModalComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: CategoryFormResult | undefined) => {
        if (result) {
          console.log('New category data:', result);
          // TODO: Llamar al servicio para crear la categoría
          // this.categoriesService.createCategory(result).subscribe(...)
          this.loadCategories(); // Recargar datos después de agregar
        }
      });
  }

  private handleEditCategory(category: Category) {
    const dialogData: CategoryFormData = {
      mode: 'edit',
      title: 'Editar Categoría',
      category: category,
    };

    const dialogRef = this.dialog.open(CategoryFormModalComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: CategoryFormResult | undefined) => {
        if (result) {
          console.log('Edit category data:', result);
          // TODO: Llamar al servicio para actualizar la categoría
          // this.categoriesService.updateCategory(category.id, result).subscribe(...)
          this.loadCategories(); // Recargar datos después de editar
        }
      });
  }

  private handleDeleteCategory(category: Category) {
    // TODO: Implementar modal de confirmación para eliminar
    console.log('Delete category action triggered for:', category);

    // Por ahora, mostrar un confirm nativo
    if (
      confirm(
        `¿Estás seguro de que quieres eliminar la categoría "${category.name}"?`
      )
    ) {
      // TODO: Implementar eliminación
      console.log('Confirmed delete for:', category.name);
    }
  }
}
