import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Category } from '../../models/category.model';

export interface FilterEvent {
  filterValue: string;
}

export interface ActionEvent {
  action: 'edit' | 'delete' | 'add';
  category?: Category;
}

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
export class CategoriesTableComponent {
  // Inputs para recibir datos
  dataSource = input<Category[]>([]);
  loading = input<boolean>(false);
  error = input<string | null>(null);
  totalItems = input<number>(0);
  currentPage = input<number>(1);
  pageSize = input<number>(10);
  filterValue = input<string>('');

  // Outputs para emitir eventos
  filterChange = output<FilterEvent>();
  filterClear = output<void>();
  pageChange = output<PageEvent>();
  actionEvent = output<ActionEvent>();

  // Computed para total de items filtrados (para mostrar en UI)
  filteredTotalItems = computed(() => this.dataSource().length);

  // Computed properties constantes
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

  // Métodos para emitir eventos
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterChange.emit({ filterValue });
  }

  clearFilter() {
    this.filterClear.emit();
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  onAddCategory() {
    this.actionEvent.emit({ action: 'add' });
  }

  onEditCategory(category: Category) {
    this.actionEvent.emit({ action: 'edit', category });
  }

  onDeleteCategory(category: Category) {
    this.actionEvent.emit({ action: 'delete', category });
  }
}
