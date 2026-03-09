import { Injectable, signal } from '@angular/core';
import { ROLE } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class Global {
  readonly user = signal<string | null>(null);
  readonly userEmail = signal<string | null>(null);
  readonly userName = signal<string | null>(null);
  readonly idUser = signal<string | null>(null);
  readonly rol = signal<string | null>(null);
  readonly rolDesc = signal<string | null>(null);
  readonly isLogged = signal<boolean>(false);
  readonly companyId = signal<string | null>(null);

  setUser(name: string) {
    this.user.set(name);
  }
  setEmail(email: string) {
    this.userEmail.set(email);
  }
  setUserName(name: string) {
    this.userName.set(name);
  }
  setCompanyId(id: string) {
    this.companyId.set(id);
  }
  setIsLogged(isLogged: boolean) {
    this.isLogged.set(isLogged);
  }
  setRol(role: string) {
    this.rol.set(role);
    this.setRolDesc(role);
  }

  setRolDesc(role: string) {
    const rol = ROLE[role];
    this.rolDesc.set(rol);
  }
  setIdUser(id: string) {
    this.idUser.set(id);
  }

  reset() {
    this.user.set(null);
    this.idUser.set(null);
    this.rol.set(null);
    this.isLogged.set(false);
    this.companyId.set(null);
    this.userEmail.set(null);
    this.userName.set(null);
  }
}
