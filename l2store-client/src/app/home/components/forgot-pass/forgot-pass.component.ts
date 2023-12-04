import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../shared/services/auth.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './../../../user/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent implements OnInit {
  sendSuccess: boolean = false;
  loading = false;
  loadingIcon = faSpinner;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userSerive: UserService,
    private authService: AuthService,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Forgot password');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.duringAction();
      this.authService
        .sendResetInstruction(this.form.controls['email'].value)
        .subscribe({
          next: (res) => {
            this.sendSuccess = true;
            this.afterAction();
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
