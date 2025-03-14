import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule, FormsModule
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent{
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Validiert die Eingaben
   */
  isControlInvalid(form: NgForm, controlName: string): boolean {
    const control = form.controls[controlName];
    return control && control.invalid && control.touched;
  }

  /**
   * Nimmt eine Registrierungs-Anfrage entgegen
   */
  register() {
    this.errorMessage = '';
    this.authService.register(this.username, this.firstName, this.lastName, this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/login'], {queryParams: {message: 'Registration successful, use the login please!'}}).then();
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    })
  }
}
