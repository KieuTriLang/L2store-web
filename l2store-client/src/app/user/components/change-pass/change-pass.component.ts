import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  err: string = '';
  loading = false;
  form!: FormGroup;
  isSuccess = false;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.valid && this.matchPassword()) {
      this.duringAction();
      this.userService
        .changePassword({
          oldPassword: this.form.controls['oldPassword'].value,
          newPassword: this.form.controls['newPassword'].value,
        })
        .subscribe({
          next: (res) => {
            this.afterAction();
            this.isSuccess = true;
          },
          error: (err) => {
            this.afterAction();
            // console.log(err);
            this.err = err.error.messages[0];
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

  matchPassword(): boolean {
    return (
      this.form.get('newPassword')?.value ===
      this.form.get('confirmPassword')?.value
    );
  }
}
