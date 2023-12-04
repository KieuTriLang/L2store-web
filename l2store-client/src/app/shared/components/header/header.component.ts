import { CartService } from './../../../order/services/cart.service';
import { UserService } from './../../../user/services/user.service';
import { AuthService } from './../../services/auth.service';
import {
  faHome,
  faCompass,
  faBoxArchive,
  faCartShopping,
  faClockRotateLeft,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  homeIcon = faHome;
  compassIcon = faCompass;
  collectionIcon = faBoxArchive;
  orderIcon = faCartShopping;
  historyIcon = faClockRotateLeft;

  facebookIcon = faFacebook;
  instagramIcon = faInstagram;
  twitterIcon = faTwitter;

  dotIcon = faCircle;
  sizeIcon: any = '2x';

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  logout() {
    this.authService.logout();
  }
}
