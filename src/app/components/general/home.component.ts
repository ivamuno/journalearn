import { Component, OnInit } from '@angular/core';
import { i18nKeys } from 'src/app/shared/i18n.keys';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  i18nKeys = i18nKeys;
  
  constructor() {}

  ngOnInit(): void {}
}
