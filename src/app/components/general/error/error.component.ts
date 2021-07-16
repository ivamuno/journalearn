import { Component, Injectable, Input, OnDestroy, OnInit } from "@angular/core"
import { ServiceError } from "../../../shared/services/service-error.model"

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
@Injectable()
export class ErrorComponent implements OnInit, OnDestroy {
  @Input()
  error : ServiceError;

  ngOnInit(): void { 
    console.log('error', this.error)
  }

  ngOnDestroy(): void { }
}
