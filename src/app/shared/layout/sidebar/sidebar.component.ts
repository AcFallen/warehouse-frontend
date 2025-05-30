import { Component, input, output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isOpen = input<boolean>(true);
  toggleSidebar = output<void>();
  closeSidebar = output<void>();

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      label: 'Inventario',
      icon: 'inventory',
      children: [
        {
          label: 'Lista de Productos',
          icon: 'list',
          route: '/products',
        },
        {
          label: 'Categorías',
          icon: 'category',
          route: '/categories',
        },
        {
          label: 'Movimientos',
          icon: 'swap_horiz',
          route: '/movements',
        },
        {
          label: 'Ajustes de Stock',
          icon: 'tune',
          route: '/stock-adjustments',
        },
      ],
    },
    {
      label: 'Almacenes',
      icon: 'warehouse',
      children: [
        {
          label: 'Lista de Almacenes',
          icon: 'business',
          route: '/warehouses',
        },
        {
          label: 'Ubicaciones',
          icon: 'place',
          route: '/locations',
        },
        {
          label: 'Zonas',
          icon: 'map',
          route: '/zones',
        },
      ],
    },
    {
      label: 'Proveedores',
      icon: 'local_shipping',
      children: [
        {
          label: 'Lista de Proveedores',
          icon: 'people',
          route: '/suppliers',
        },
        {
          label: 'Órdenes de Compra',
          icon: 'shopping_cart',
          route: '/purchase-orders',
        },
        {
          label: 'Recepciones',
          icon: 'inbox',
          route: '/receptions',
        },
      ],
    },
    {
      label: 'Reportes',
      icon: 'assessment',
      children: [
        {
          label: 'Inventario Actual',
          icon: 'bar_chart',
          route: '/reports/inventory',
        },
        {
          label: 'Movimientos',
          icon: 'timeline',
          route: '/reports/movements',
        },
        {
          label: 'Stock Bajo',
          icon: 'warning',
          route: '/reports/low-stock',
        },
        {
          label: 'Valorización',
          icon: 'attach_money',
          route: '/reports/valuation',
        },
      ],
    },
    {
      label: 'Configuración',
      icon: 'settings',
      children: [
        {
          label: 'Usuarios',
          icon: 'people',
          route: '/settings/users',
        },
        {
          label: 'Permisos',
          icon: 'security',
          route: '/settings/permissions',
        },
        {
          label: 'Sistema',
          icon: 'computer',
          route: '/settings/system',
        },
      ],
    },
  ];

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onNavigate() {
    // En móvil, cerrar el sidebar al navegar usando el output específico
    this.closeSidebar.emit();
  }

  toggleExpansion(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
