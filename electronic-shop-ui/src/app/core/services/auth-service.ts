import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private tokenKey = 'auth_token';
  private roleKey = 'user_role';

  login(data: { email: string; password: string }) {
    return this.http.post<any>('https://localhost:7271/api/Auth/login', data);
  }

  saveSession(token: string, role: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
  }

  getToken()
  {
    return localStorage.getItem(this.tokenKey);
  }

  getRole()
  {
    return localStorage.getItem(this.roleKey);
  }
  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
  }
  
}
