import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Semaines } from '../../models/semaines';

@Injectable({
  providedIn: 'root'
})
export class SemaineService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getSemaines(): Observable<Semaines[]> {
    return this.http.get<Semaines[]>(`${this.apiUrl}/semaines`);
  }

  createSemaine(data: any): Observable<Semaines> {
    return this.http.post<Semaines>(`${this.apiUrl}/semaines`, data);
  }

  updateSemaine(id: number, data: any): Observable<Semaines> {
    return this.http.put<Semaines>(`${this.apiUrl}/semaines/${id}`, data);
  }

  deleteSemaine(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/semaines/${id}`);
  }
}