import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<ToastItem[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private sequence = 0;

  show(
    message: string,
    duration = 2000,
    type: ToastType = 'success',
  ): number {
    const id = ++this.sequence;
    const toast: ToastItem = {
      id,
      message,
      duration,
      type,
    };

    this._toasts.update((current) => [...current, toast]);
    setTimeout(() => this.remove(id), duration);
    return id;
  }

  remove(id: number): void {
    this._toasts.update((current) => current.filter((item) => item.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}
