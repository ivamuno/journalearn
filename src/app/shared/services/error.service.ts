import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceError } from './models/service-error.model';
import { toast, ToastType } from 'bulma-toast';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public errorEvent = new EventEmitter<ServiceError | undefined>();
  private error: ServiceError | undefined;

  constructor(private readonly translateService: TranslateService, private readonly router: Router) {
    this.router.events.subscribe(() => {
      if (this.error) {
        this.emitError(undefined);
      }
    });
  }

  public setGlobalError(error: ServiceError): void {
    this.emitError(error);
  }

  public addErrorNotification(key: string, interpolateParams?: Object): void {
    this.addNotification('is-danger', key, interpolateParams);
  }

  public addSuccessNotification(key: string, interpolateParams?: Object): void {
    this.addNotification('is-success', key, interpolateParams);
  }

  private addNotification(type: ToastType, key: string, interpolateParams?: Object): void {
    toast({
      message: this.translateService.instant(key, interpolateParams),
      type: type,
      position: 'top-center',
      dismissible: true,
      pauseOnHover: true,
      duration: 5000,
    });
  }

  private emitError(error: ServiceError | undefined) {
    console.log('emitError', error);
    this.error = error;
    this.errorEvent.next(error);
  }
}
