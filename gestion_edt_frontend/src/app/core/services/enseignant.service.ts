import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enseignant } from '../../models/enseignant';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getEnseignants(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(`${this.apiUrl}/enseignants`);
  }

  createEnseignant(data: any): Observable<Enseignant> {
    return this.http.post<Enseignant>(`${this.apiUrl}/enseignants`, data);
  }

  updateEnseignant(id: number, data: any): Observable<Enseignant> {
    return this.http.put<Enseignant>(`${this.apiUrl}/enseignants/${id}`, data);
  }

  deleteEnseignant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/enseignants/${id}`);
  }
}