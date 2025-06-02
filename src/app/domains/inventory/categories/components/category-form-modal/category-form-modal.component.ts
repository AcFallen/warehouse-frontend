import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';

export interface CategoryFormData {
  mode: 'add' | 'edit';
  title: string;
  category?: Category;
}

export interface CategoryFormResult {
  name: string;
  description: string;
  isActive: boolean;
}

@Component({
  selector: 'app-category-form-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogActions
    
  ],
  templateUrl: './category-form-modal.component.html',
  styleUrl: './category-form-modal.component.scss',
})
export class CategoryFormModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CategoryFormModalComponent>);
  readonly data = inject<CategoryFormData>(MAT_DIALOG_DATA);

  // Signal para el estado de loading
  loading = signal(false);

  // Formulario reactivo
  categoryForm: FormGroup;

  constructor() {
    this.categoryForm = this.fb.group({
      name: [
        this.data.category?.name || '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      description: [
        this.data.category?.description || '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
      isActive: [this.data.category?.isActive ?? true],
    });
  }

  // Getters para fácil acceso a los controles
  get nameControl() {
    return this.categoryForm.get('name');
  }

  get descriptionControl() {
    return this.categoryForm.get('description');
  }

  get isActiveControl() {
    return this.categoryForm.get('isActive');
  }

  // Métodos para mostrar errores
  getNameErrorMessage(): string {
    if (this.nameControl?.hasError('required')) {
      return 'El nombre es requerido';
    }
    if (this.nameControl?.hasError('minlength')) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    if (this.nameControl?.hasError('maxlength')) {
      return 'El nombre no puede exceder 100 caracteres';
    }
    return '';
  }

  getDescriptionErrorMessage(): string {
    if (this.descriptionControl?.hasError('required')) {
      return 'La descripción es requerida';
    }
    if (this.descriptionControl?.hasError('minlength')) {
      return 'La descripción debe tener al menos 5 caracteres';
    }
    if (this.descriptionControl?.hasError('maxlength')) {
      return 'La descripción no puede exceder 500 caracteres';
    }
    return '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.loading.set(true);

      const formValue: CategoryFormResult = {
        name: this.nameControl?.value.trim(),
        description: this.descriptionControl?.value.trim(),
        isActive: this.isActiveControl?.value ?? true,
      };

      // Simular un delay de procesamiento
      setTimeout(() => {
        this.loading.set(false);
        this.dialogRef.close(formValue);
      }, 1000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      this.categoryForm.markAllAsTouched();
    }
  }
}
