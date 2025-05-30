import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { ProductListComponent } from './domains/products/pages/product-list/product-list.component';

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
    path: 'products',
    component: ProductListComponent,
  },
];