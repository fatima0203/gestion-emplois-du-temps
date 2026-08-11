import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seance } from '../../models/seance';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getSeances(specialite: string = '', semaine_id: any = ''): Observable<Seance[]> {
    let params = new HttpParams();
    if (specialite) params = params.set('specialite', specialite);
    if (semaine_id) params = params.set('semaine_id', semaine_id);
    return this.http.get<Seance[]>(`${this.apiUrl}/seances`, { params });
  }

  createSeance(data: any): Observable<Seance> {
    return this.http.post<Seance>(`${this.apiUrl}/seances`, data);
  }

  updateSeance(id: number, data: any): Observable<Seance> {
    return this.http.put<Seance>(`${this.apiUrl}/seances/${id}`, data);
  }

  deleteSeance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/seances/${id}`);
  }

  getSeancesParEnseignant(enseignantId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/edt/enseignant/${enseignantId}`);
}

  getToutesLesSeances(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seances`);
  }
}