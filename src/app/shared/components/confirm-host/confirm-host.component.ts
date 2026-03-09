import { CommonModule } from '@angular/common';
import { Component, HostListener, computed } from '@angular/core';
import { ConfirmService } from '@core/services';

@Component({
  selector: 'app-confirm-host',
  imports: [CommonModule],
  templateUrl: './confirm-host.component.html',
  styleUrl: './confirm-host.component.scss',
})
export class ConfirmHostComponent {
  readonly current = computed(() => this.confirmService.current());

  constructor(private readonly confirmService: ConfirmService) {}

  onBackdrop(): void {
    this.confirmService.resolve(false);
  }

  onCancel(): void {
    this.confirmService.resolve(false);
  }

  onConfirm(): void {
    this.confirmService.resolve(true);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (!this.current()) return;
    this.confirmService.resolve(false);
  }
}

