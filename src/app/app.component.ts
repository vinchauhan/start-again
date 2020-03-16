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

  constructor(private pageTitle: Title) {
  }

  ngOnInit(): void {
  }

  clickOnTab(value) {
    console.log('setting page title');
    this.pageTitle.setTitle(this.titlePreFix + value);
  }
}
