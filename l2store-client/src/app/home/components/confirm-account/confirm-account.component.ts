import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../shared/services/auth.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../user/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  title = 'Confirm email successfully';
  message = 'Thank you for registering. Now, you can sign in.';

  isConfirmed = false;
  loading = false;
  sent = false;

  loadingIcon = faSpinner;

  form!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userSerivce: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Active account');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token != undefined) {
        this.authService.confirmAccount(token).subscribe({
          next: (res) => {
            this.isConfirmed = true;
          },
          error: (err) => {
            console.log(err);
            this.title = 'Confirm email failed';
            this.message =
              err.error.messages[0] +
              '. Re-type your email to confirm account.';
          },
        });
      }
    });
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.duringAction();
      this.authService
        .sendReConfirm(this.form.controls['email'].value)
        .subscribe({
          next: (res) => {
            this.afterAction();
            this.title = `Resend to ${this.form.controls['email'].value} successfully`;
            this.message = 'Please check email to active your account';
          },
          error: (err) => {
            console.log(err);
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
}
