import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';


@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})

export class LandingPageComponent {

  showLoginPanel = false;
  showPassword = false;
  loginError = '';
  currentYear = new Date().getFullYear();
  isLoggingIn = false;

  loginModel = {
    loginId: 'admin',
    password: 'Admin@123'
  };

  constructor(private router: Router, private authService: AuthService) { }

  openLoginPanel(): void {
    this.showLoginPanel = true;
    this.loginError = '';
  }

  closeLoginPanel(): void {
    this.showLoginPanel = false;
    this.loginError = '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.loginError = '';

    if (!this.loginModel.loginId.trim()) {
      this.loginError = 'Please enter your Login ID.';
      return;
    }

    if (!this.loginModel.password) {
      this.loginError = 'Please enter your password.';
      return;
    }

    this.isLoggingIn = true;

    this.authService.login(this.loginModel).subscribe({
      next: () => {
        this.isLoggingIn = false;
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.isLoggingIn = false;

        this.loginError =
          error?.error?.message ??
          'Invalid Login ID or password.';
      }
    });
  }

}
