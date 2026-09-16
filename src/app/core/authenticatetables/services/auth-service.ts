import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { LoginRequest, LoginResponse } from './login.model';
import { LoginRequest } from '../models/loginRequest-loginModel';
import { LoginResponse } from '../models/loginresponse-loginModel';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly apiUrl = 'https://localhost:7041/api/auth';

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => {
          sessionStorage.setItem('accessToken', response.token);
          sessionStorage.setItem(
            'databaseCode',
            response.databaseCode
          );
          sessionStorage.setItem('userName', response.userName);
        })
      );
  }

  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  getDatabaseCode(): string {
    return sessionStorage.getItem('databaseCode') ?? 'DEFAULT';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('databaseCode');
    sessionStorage.removeItem('userName');
  }

}
