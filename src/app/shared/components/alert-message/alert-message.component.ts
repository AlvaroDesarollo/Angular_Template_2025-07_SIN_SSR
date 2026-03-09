import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  imports: [CommonModule],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.scss',
})
export class AlertMessageComponent {
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() message: string = '';
  @Input() autoClose: boolean = true;
  @Input() duration: number = 5000;

  @Output() closed = new EventEmitter<void>();

  ngOnInit() {
    if (this.autoClose) {
      setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  close() {
    this.closed.emit();
  }
}
