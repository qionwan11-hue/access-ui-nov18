import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = this.resolveBaseUrl();
  }

  private resolveBaseUrl(): string {
    const configured = (environment.backendUrl || '').trim();
    const isPlaceholder = !configured || configured.includes('NG_APP_');

    if (!isPlaceholder) {
      return configured.replace(/\/$/, '');
    }

    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://localhost:3000/api';
    }

    return 'https://sep202609api.onrender.com/api';
  }

  // GET request
  get<T>(endpoint: string, params?: any): Observable<T> {
      const httpParams = new HttpParams({ fromObject: params });
      return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }

  // POST request
  post<T>(endpoint: string, data: any): Observable<T> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  // PUT request
  put<T>(endpoint: string, data: any): Observable<T> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  // DELETE request
  delete<T>(endpoint: string): Observable<T> {
      return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }

  // PATCH request
  patch<T>(endpoint: string, data: any): Observable<T> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, data, { headers });
  }
}
