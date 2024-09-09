import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  public readonly authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    const token = this.getToken()
    if (token) {
      this.updateToken(true);
    }
  }

  public setToken(token: string) {
    this.updateToken(true);
    localStorage.setItem(environment.authToken, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(environment.authToken);
  }

  public updateToken(status: boolean) {
    this.authenticated.next(status);
  }

  public removeToken() {
    this.updateToken(false);
    localStorage.removeItem(environment.authToken);
  }
}
