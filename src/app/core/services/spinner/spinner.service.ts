import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  // Basic spinner
  private _active = signal(false);
  active = this._active.asReadonly();

  // Loading with message
  private _loadingActive = signal(false);
  private _loadingMessage = signal('Cargando...');
  private _loadingFullScreen = signal(true);

  readonly loadingActive = this._loadingActive.asReadonly();
  readonly loadingMessage = this._loadingMessage.asReadonly();
  readonly loadingFullScreen = this._loadingFullScreen.asReadonly();

  show() {
    this._active.set(true);
  }

  hide() {
    this._active.set(false);
  }

  // Loading with configurable text and display mode
  showLoading(message: string = 'Cargando...', fullScreen = true) {
    this._loadingMessage.set(message);
    this._loadingFullScreen.set(fullScreen);
    this._loadingActive.set(true);
  }

  hideLoading() {
    this._loadingActive.set(false);
  }
}
