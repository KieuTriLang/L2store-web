import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../shared/services/auth.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../user/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  isConfirmedToken = false;
  resetSuccess = false;
  message = '';

  tokenParam = '';
  loading = false;
  loadingIcon = faSpinner;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Reset password');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token != undefined) {
        this.authService.reset(token).subscribe({
          next: (res) => {
            this.isConfirmedToken = true;
            this.tokenParam = token;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.duringAction();
      this.userService
        .resetPassword(this.tokenParam, this.form.controls['password'].value)
        .subscribe({
          next: (res) => {
            this.afterAction();
            this.afterResetSuccess();
          },
          error: (err) => {
            this.afterAction();
          },
        });
    }
  }
  duringAction() {
    this.loading = true;
    this.form.disable();
  }
  afterAction() {
    this.loading = false;
    this.form.enable();
  }

  afterResetSuccess() {
    this.resetSuccess = true;
    this.form.disable();
  }
}
