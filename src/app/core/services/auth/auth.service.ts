import { Injectable } from '@angular/core';
import { ROUTES } from '@core/constants';
import { IResponseHttp } from '@core/models';
import { Global } from '../global/global.service';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly api: ApiService,
    private readonly global: Global,
  ) {}

  setSession({
    accessToken,
    email,
    fullName,
    userId,
    scope,
    emailVerified,
  }: {
    accessToken: string;
    email: string;
    fullName: string;
    userId: string;
    scope?: 'full' | 'checkout';
    emailVerified?: boolean;
  }): void {
    const resolvedScope = scope || this.extractScopeFromToken(accessToken) || 'full';
    const resolvedEmailVerified =
      typeof emailVerified === 'boolean'
        ? emailVerified
        : this.extractEmailVerifiedFromToken(accessToken);

    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('user_email', email);
    sessionStorage.setItem('user_fullname', fullName);
    sessionStorage.setItem('user_id', userId);
    sessionStorage.setItem('auth_scope', resolvedScope);
    sessionStorage.setItem(
      'email_verified',
      resolvedEmailVerified ? 'true' : 'false',
    );

    this.global.setIsLogged(true);
    this.global.setEmail(email);
    this.global.setUser(fullName);
    this.global.setUserName(fullName);
    this.global.setIdUser(userId);
  }

  restoreSession(): void {
    const accessToken = sessionStorage.getItem('access_token');
    const email = sessionStorage.getItem('user_email');
    const fullName = sessionStorage.getItem('user_fullname');
    const userId = sessionStorage.getItem('user_id');

    if (!accessToken || !email || !fullName || !userId) return;
    if (!this.hasValidToken()) {
      this.clearSession();
      return;
    }

    this.global.setIsLogged(true);
    this.global.setEmail(email);
    this.global.setUser(fullName);
    this.global.setUserName(fullName);
    this.global.setIdUser(userId);
  }

  hasValidToken(): boolean {
    const token = sessionStorage.getItem('access_token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = Number(payload?.exp || 0);
      if (!exp) return true;
      return exp > Math.floor(Date.now() / 1000);
    } catch {
      return true;
    }
  }

  clearSession(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_fullname');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('auth_scope');
    sessionStorage.removeItem('email_verified');
    this.global.reset();
  }

  getAuthScope(): 'full' | 'checkout' {
    const scope = sessionStorage.getItem('auth_scope');
    return scope === 'checkout' ? 'checkout' : 'full';
  }

  hasProfileAccess(): boolean {
    return this.getAuthScope() === 'full';
  }

  isCheckoutScoped(): boolean {
    return this.getAuthScope() === 'checkout';
  }

  async requestLoginCode(email: string): Promise<IResponseHttp> {
    return this.api.post<IResponseHttp>(ROUTES.AUTH_REQUEST_LOGIN_CODE, {
      email,
    });
  }

  async verifyLoginCode(
    email: string,
    uniqueCode: string,
  ): Promise<IResponseHttp> {
    return this.api.post<IResponseHttp>(ROUTES.AUTH_VERIFY_LOGIN_CODE, {
      email,
      uniqueCode,
    });
  }

  async register(payload: {
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    city: string;
    email: string;
    phone: string;
    documentNumber: string;
  }): Promise<IResponseHttp> {
    return this.api.post<IResponseHttp>(ROUTES.AUTH_REGISTER, payload);
  }


  private decodeTokenPayload(token: string): Record<string, unknown> | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  private extractScopeFromToken(token: string): 'full' | 'checkout' | null {
    const payload = this.decodeTokenPayload(token);
    const scope = payload?.['scope'];
    if (scope === 'checkout') return 'checkout';
    if (scope === 'full') return 'full';
    return null;
  }

  private extractEmailVerifiedFromToken(token: string): boolean {
    const payload = this.decodeTokenPayload(token);
    return payload?.['emailVerified'] !== false;
  }
}

