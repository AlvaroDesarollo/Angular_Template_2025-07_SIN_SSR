import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertsSubject.asObservable();

  showAlert(alert: Alert) {
    const current = this.alertsSubject.getValue();
    this.alertsSubject.next([...current, alert]);
  }

  removeAlert(index: number) {
    const current = this.alertsSubject.getValue();
    current.splice(index, 1);
    this.alertsSubject.next([...current]);
  }

  clearAlerts() {
    this.alertsSubject.next([]);
  }
}
