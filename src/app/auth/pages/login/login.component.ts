import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../shared/services/theme.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  themeService = inject(ThemeService);
  router = inject(Router);
  hide = signal(true);

  form = new FormGroup({
    email: new FormControl('rodrigocastillo@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]),
  });

  // Getters para acceso fácil a los controles
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      // Simular autenticación exitosa y redirigir al dashboard
      this.router.navigate(['/dashboard']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
