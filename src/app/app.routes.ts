import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { DashboardComponent } from './domains/dashboard/dashboard.component';
import { WarehouseListComponent } from './domains/warehouses/pages/warehouse-list/warehouse-list.component';
import { InventoryReportsComponent } from './domains/reports/pages/inventory-reports/inventory-reports.component';
import { ProductListComponent } from './domains/inventory/products/pages/product-list/product-list.component';
import { CategoryListComponent } from './domains/inventory/categories/category-list/category-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'categories',
        component: CategoryListComponent,
      },
      {
        path: 'movements',
        component: ProductListComponent, // Placeholder
      },
      {
        path: 'stock-adjustments',
        component: ProductListComponent, // Placeholder
      },
      {
        path: 'warehouses',
        component: WarehouseListComponent,
      },
      {
        path: 'locations',
        component: WarehouseListComponent, // Placeholder
      },
      {
        path: 'zones',
        component: WarehouseListComponent, // Placeholder
      },
      {
        path: 'suppliers',
        component: ProductListComponent, // Placeholder
      },
      {
        path: 'purchase-orders',
        component: ProductListComponent, // Placeholder
      },
      {
        path: 'receptions',
        component: ProductListComponent, // Placeholder
      },
      {
        path: 'reports/inventory',
        component: InventoryReportsComponent,
      },
      {
        path: 'reports/movements',
        component: InventoryReportsComponent, // Placeholder
      },
      {
        path: 'reports/low-stock',
        component: InventoryReportsComponent, // Placeholder
      },
      {
        path: 'reports/valuation',
        component: InventoryReportsComponent, // Placeholder
      },
      {
        path: 'settings/users',
        component: ProductListComponent, // Placeholder
      },
      {
        path: 'settings/permissions',
        component: ProductListComponent, // Placeholder
      },
      {
        path: 'settings/system',
        component: ProductListComponent, // Placeholder
      },
    ],
  },
];
