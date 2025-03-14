import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule, FormsModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage = '';
  registrationSuccessMessage = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  /**
   * Nimmt eine login-Anfrage entgegen
   */
  login() {
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.router.navigate(['/']).then();
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.registrationSuccessMessage = params['message'];
      }
    })
  }

}
