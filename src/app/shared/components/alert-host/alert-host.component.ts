import { Component } from '@angular/core';
import { Alert, AlertService } from '@core/services';
import { AlertMessageComponent } from '../alert-message/alert-message.component';

@Component({
  selector: 'app-alert-host',
  imports: [AlertMessageComponent],
  templateUrl: './alert-host.component.html',
  styleUrl: './alert-host.component.scss',
})
export class AlertHostComponent {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {
    this.alertService.alerts$.subscribe((a) => (this.alerts = a));
  }

  closeAlert(index: number) {
    this.alertService.removeAlert(index);
  }
}

