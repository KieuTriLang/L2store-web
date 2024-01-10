import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  error: string = '';

  loading = false;
  loadIcon = faSpinner;
  signUpSuccessState = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Sign up');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  submit() {
    if (this.form.invalid || !this.matchPassword()) {
      return;
    }
    const username = this.form.get('username')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.duringAction();
    this.authService.signup(username, email, password).subscribe({
      next: (res) => {
        this.afterAction();
        this.signUpSuccessState = true;
      },
      error: (error) => {
        this.error = error.error.messages[0];
        this.afterAction();
      },
    });
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
      this.form.get('password')?.value ===
      this.form.get('confirmPassword')?.value
    );
  }
}
