import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Global } from '@core/services';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private http = inject(HttpClient);
  private globalService = inject(Global);

  error(message: string, error?: any) {
    const payload = {
      level: 'error',
      message,
      status: error?.status ?? null,
      stack: error?.stack ?? null,
      url: error?.url ?? location.href,
      userAgent: navigator.userAgent,
      context: error?.context ?? null,
      timestamp: new Date().toISOString(),
      idUser: this.globalService.idUser(),
      idCompany: this.globalService.companyId(),
    };

    this.http
      .post(`${environment.apiUrl}/logs`, payload)
      .subscribe({ error: () => {} });
  }
}
