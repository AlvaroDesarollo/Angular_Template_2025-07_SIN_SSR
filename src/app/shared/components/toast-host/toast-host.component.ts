import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { ToastService } from '@core/services';

@Component({
  selector: 'app-toast-host',
  imports: [CommonModule],
  templateUrl: './toast-host.component.html',
  styleUrl: './toast-host.component.scss',
})
export class ToastHostComponent {
  readonly toasts = computed(() => this.toastService.toasts());

  constructor(private readonly toastService: ToastService) {}

  remove(id: number): void {
    this.toastService.remove(id);
  }
}

