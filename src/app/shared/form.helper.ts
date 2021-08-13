import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class FormHelper {
  constructor(
    private readonly translateService: TranslateService
  ) {
  }

  hasError(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  getFirstError(control: AbstractControl): string {
    const errors = Object.entries(control.errors || {});
    if (errors.length > 0) {
      const error = errors[0];
      const errorKey = `FORM.ERRORS.${error[0].toUpperCase()}`;
      const param = error[1].requiredLength;
      return this.translateService.instant(errorKey, { value: param });
    }

    return '';
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
