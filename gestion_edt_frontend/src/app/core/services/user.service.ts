import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  const stored = localStorage.getItem('user');

  if (stored && stored !== 'undefined') {
    try {
      this.userSubject.next(JSON.parse(stored));
    } catch (e) {
      console.error('Erreur parsing user localStorage', e);
      localStorage.removeItem('user');
    }
  }
}



  connexion(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/connexion`, { email, password }).pipe(
      tap(res => { 
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
      })
    );
  }

  deconnexion() {
    this.http.post(`${this.apiUrl}/deconnexion`, {}).subscribe();
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/connexion']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'admin';
  }

  isEtudiant(): boolean {
    return this.getUser()?.role === 'etudiant';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}