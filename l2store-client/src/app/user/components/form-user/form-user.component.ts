import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {
  loading = false;
  form!: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [],
      lastName: [],
      gender: [],
      address: [],
      dob: [],
    });
    this.userService.getInfo().subscribe({
      next: (res) => {
        this.form.setValue({
          firstName: res.firstName || '',
          lastName: res.lastName || '',
          gender: res.gender,
          address: res.address,
          dob: res.dob || new Date(),
        });
      },
    });
  }

  submit() {
    if (this.form.valid) {
      this.duringAction();
      this.userService.updateUser(this.form.value).subscribe({
        next: (res) => {
          this.afterAction();
          this.form.reset();
          this.userService.changeRequestState(true);
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.log(err);
          this.afterAction();
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/user']);
  }
  duringAction() {
    this.loading = true;
    this.form.disable();
  }
  afterAction() {
    this.loading = false;
    this.form.enable();
  }
}
