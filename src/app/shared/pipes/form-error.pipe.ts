import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'formError',
})
export class FormErrorPipe implements PipeTransform {
  transform(control: FormControl, fieldName: string = 'Campo'): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) {
      return `${fieldName} es requerido`;
    }
    if (errors['email']) {
      return 'Debe ser un email válido';
    }
    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `${fieldName} debe tener al menos ${requiredLength} caracteres`;
    }
    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      return `${fieldName} no debe exceder ${requiredLength} caracteres`;
    }
    if (errors['pattern']) {
      return `${fieldName} tiene un formato inválido`;
    }

    return `${fieldName} es inválido`;
  }
}
