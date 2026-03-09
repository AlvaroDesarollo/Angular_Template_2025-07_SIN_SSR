import { Injectable, signal } from '@angular/core';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

interface ConfirmState extends ConfirmOptions {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private readonly _current = signal<ConfirmState | null>(null);
  readonly current = this._current.asReadonly();

  private seq = 0;
  private resolver: ((value: boolean) => void) | null = null;

  ask(options: ConfirmOptions): Promise<boolean> {
    if (this.resolver) {
      this.resolver(false);
      this.resolver = null;
    }

    const state: ConfirmState = {
      id: ++this.seq,
      title: options.title || 'Confirmar accion',
      message: options.message,
      confirmText: options.confirmText || 'Confirmar',
      cancelText: options.cancelText || 'Cancelar',
      danger: Boolean(options.danger),
    };

    this._current.set(state);
    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  resolve(accepted: boolean): void {
    if (this.resolver) {
      this.resolver(accepted);
      this.resolver = null;
    }
    this._current.set(null);
  }
}
