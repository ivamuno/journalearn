import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { toast, ToastType } from 'bulma-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly translateService: TranslateService) { }

  public addError(key: string, interpolateParams?: Object): void {
    this.add('is-danger', key, interpolateParams);
  }

  public addSuccess(key: string, interpolateParams?: Object): void {
    this.add('is-success', key, interpolateParams);
  }

  private add(type: ToastType, key: string, interpolateParams?: Object): void {
    toast({
      message: this.translateService.instant(key, interpolateParams),
      type: type,
      position: 'top-center',
      dismissible: true,
      pauseOnHover: true,
      duration: 5000
    });
  }
}
