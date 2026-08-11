import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../../models/cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/cours`);
  }

  createCours(data: any): Observable<Cours> {
    return this.http.post<Cours>(`${this.apiUrl}/cours`, data);
  }

  updateCours(id: number, data: any): Observable<Cours> {
    return this.http.put<Cours>(`${this.apiUrl}/cours/${id}`, data);
  }

  deleteCours(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cours/${id}`);
  }
}