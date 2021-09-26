import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  titlePreFix = 'Helios - ';
  firstName = 'Vineet';
  lastName = 'Chauhan';
  selectedCar: number;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

  constructor() {
  }

  ngOnInit(): void {
  }

  clickOnTab(value) {
    
  }
}
