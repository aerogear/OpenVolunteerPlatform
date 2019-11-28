import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

type AuthInfoType = 'none' | 'init' | 'login' | 'logout';

interface AuthInfo {
  type: AuthInfoType;
  payload?: any;
}

/**
 * A service that can be used to publish/subscribe to the auth status of the app.
 * @export
 * @class AuthStateService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private state: BehaviorSubject<AuthInfo>;

  constructor() {
    this.state = new BehaviorSubject<AuthInfo>({ type : 'none'});
  }

  subscribe(handler) {
    this.state.subscribe(handler);
  }

  init() {
    this.state.next({type: 'init'});
  }

  login(user) {
    this.state.next({type: 'login', payload: user});
  }

  logout() {
    this.state.next({type: 'logout'});
  }
}
