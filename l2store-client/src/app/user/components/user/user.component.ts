import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faHome, faEdit, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  homeIcon = faHome;
  editIcon = faEdit;
  keyIcon = faKey;

  userInfo: User = {
    firstName: '',
    lastName: '',
    email: '',
    gender: undefined,
    avatar: '',
    address: '',
    dob: '',
  };
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getInfo();
    this.userService.requestState$.subscribe({
      next: (res) => {
        if (res) {
          this.getInfo();
        }
      },
    });
  }

  getInfo() {
    this.userService.getInfo().subscribe({
      next: (res) => {
        this.userInfo = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
