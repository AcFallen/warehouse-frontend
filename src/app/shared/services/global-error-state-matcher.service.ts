import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorStateMatcherService implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }

  // Método para obtener mensajes de error personalizados
  getErrorMessage(control: FormControl, fieldName: string): string {
    if (control.hasError('required')) {
      return `${fieldName} es requerido`;
    }
    if (control.hasError('email')) {
      return 'Debe ser un email válido';
    }
    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `${fieldName} debe tener al menos ${requiredLength} caracteres`;
    }
    if (control.hasError('maxlength')) {
      const requiredLength = control.getError('maxlength').requiredLength;
      return `${fieldName} no debe exceder ${requiredLength} caracteres`;
    }
    if (control.hasError('pattern')) {
      return `${fieldName} tiene un formato inválido`;
    }
    return `${fieldName} es inválido`;
  }
}
