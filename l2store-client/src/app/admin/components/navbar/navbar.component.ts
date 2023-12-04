import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  tabName = 'home';
  constructor() {}

  ngOnInit(): void {}

  changeTab(tab: string) {
    this.tabName = tab;
  }
}
