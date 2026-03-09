import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const token = sessionStorage.getItem('access_token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  async get<T>(endpoint: string, params?: HttpParams): Promise<T> {
    return firstValueFrom(
      this.http.get<T>(`${this.apiUrl}/${endpoint}`, {
        headers: this.getHeaders(),
        params,
      }),
    );
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return firstValueFrom(
      this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
      }),
    );
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return firstValueFrom(
      this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
      }),
    );
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    return firstValueFrom(
      this.http.patch<T>(`${this.apiUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
      }),
    );
  }
}

