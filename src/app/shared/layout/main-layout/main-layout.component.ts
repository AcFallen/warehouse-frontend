import { Component, signal, computed, inject, effect } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeService } from '../../services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-layout',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    RouterOutlet,
    SidebarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  // Detectar si estamos en mobile
  private isMobile = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset]),
    { initialValue: { matches: false, breakpoints: {} } }
  );

  // Estado del sidebar - inicializar basado en el estado móvil
  sidebarOpen = signal(false); // Cambiar a false por defecto

  // Variable para trackear el estado anterior del móvil
  private wasMobile: boolean | undefined = undefined;

  // Modo del sidebar basado en el breakpoint
  sidenavMode = computed(() => {
    return this.isMobile()?.matches ? 'over' : 'side';
  });

  constructor(public themeService: ThemeService) {
    // Inicializar el estado del sidebar basado en el breakpoint actual
    effect(() => {
      const mobileState = this.isMobile();
      const isMobileNow = mobileState?.matches ?? false;

      console.log(
        'Effect triggered - wasMobile:',
        this.wasMobile,
        'isMobileNow:',
        isMobileNow
      );

      // En la primera ejecución, establecer el estado inicial
      if (this.wasMobile === undefined) {
        this.sidebarOpen.set(!isMobileNow); // Abierto en desktop, cerrado en móvil
        this.wasMobile = isMobileNow;
        return;
      }

      // Si cambió de desktop a móvil, cerrar el sidebar
      if (!this.wasMobile && isMobileNow && this.sidebarOpen()) {
        console.log('Auto-closing sidebar due to mobile transition');
        this.sidebarOpen.set(false);
      }

      this.wasMobile = isMobileNow;
    });
  }

  toggleSidebar() {
    console.log('toggleSidebar called, current state:', this.sidebarOpen());
    console.log('Is mobile:', this.isMobile()?.matches);
    console.log('Sidenav mode:', this.sidenavMode());
    this.sidebarOpen.set(!this.sidebarOpen());
    console.log('New state:', this.sidebarOpen());
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
