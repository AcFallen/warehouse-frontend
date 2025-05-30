import { Component } from '@angular/core';
import { CategoriesTableComponent } from '../components/categories-table/categories-table.component';

@Component({
  selector: 'app-category-list',
  imports: [CategoriesTableComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {}
