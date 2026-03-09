import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertHostComponent } from '@shared/components/alert-host/alert-host.component';
import { ConfirmHostComponent } from '@shared/components/confirm-host/confirm-host.component';
import { SpinnerHostComponent } from '@shared/components/spinner-host/spinner-host.component';
import { ToastHostComponent } from '@shared/components/toast-host/toast-host.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AlertHostComponent,
    ToastHostComponent,
    ConfirmHostComponent,
    SpinnerHostComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Angular_Template_2025-07';
}

