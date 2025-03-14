import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {UserAccount} from '../model/userAccount.model';

@Injectable({
  providedIn: 'root'
  })

export class AuthService {

  private user = new BehaviorSubject<UserAccount | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Semdet die Login-Anfragen an das Backend
   *
   * @param email Email
   * @param password Passwort
   * @returns User
   */
  login(email: string, password: string): Observable<UserAccount> {
    return this.http.post<UserAccount>('http://localhost:8080/api/user/login', { email, password }).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
      }),
    catchError(error => {
        const errorMessage = error.error?.error || 'Login failed. Please try again.';
        throw new Error(errorMessage);
      }
    ));
  }

  /**
   *Sendet eine Registrierungs-Anfrage an das Backend
   *
   * @param username Benutzername
   * @param firstName Vorname
   * @param lastName Nachname
   * @param email Email
   * @param password Passwort
   * @returns Erfolgsboolean
   */
  register(username: string, firstName: string, lastName: string, email: string, password: string) : Observable<boolean>{
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' })
    const body = {username, firstName, lastName, email, password}
    return this.http.post<boolean>('http://localhost:8080/api/user/register', body, {headers}).pipe(
      catchError((error) => {
          const errorMessage = error.error?.error || 'Registration failed. Please try again.';
          throw new Error(errorMessage);
        }
      ));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }

  loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user.next(new UserAccount(JSON.parse(user)));
    }
  }
}
