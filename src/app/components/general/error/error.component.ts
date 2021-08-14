import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/shared/services/error.service';

import { ServiceError } from '../../../shared/services';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
@Injectable()
export class ErrorComponent implements OnInit, OnDestroy {
  errorSubscription: Subscription;
  error: ServiceError | undefined;

  constructor(private readonly errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorSubscription = this.errorService.errorEvent.subscribe((e) => {
      this.error = e;
      console.log('ErrorComponent.error', this.error);
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
