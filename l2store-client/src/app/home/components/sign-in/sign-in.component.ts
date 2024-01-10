import { StorageService } from './../../../shared/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  error: string = 'none';
  form!: FormGroup;
  returnUrl: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Sign in');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: true,
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/explore';
  }

  submit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      const remember = this.form.get('remember')?.value;

      this.authService.signin(email, password, remember).subscribe({
        next: (res) => {
          for (var key in res) {
            this.storageService.saveTokenToLocal(`l2_${key}`, res[key]);
          }
          this.authService.changeAuthenticatedState(true);
          if (
            this.storageService.getRoles().filter((r) => r == 'ROLE_USER')
              .length > 0
          ) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/admin/home');
          }
        },
        error: (error) => {
          // console.log(error);
          this.error = error.error || '';
        },
      });
    }
  }
}
