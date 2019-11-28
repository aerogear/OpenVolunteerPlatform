import { Injectable } from '@angular/core';


/**
 * Describes config
 */
export interface ServicesConfig {
  backend: {
    serverUrl: string,
    wsServerUrl: string
  };
  push: any;
  auth: any;
}



/**
 * Service that manages OpenShift specific configuration
 */
@Injectable({
  providedIn: 'root'
})
export class ShowcaseConfigService {
  public config: ServicesConfig;

  constructor() {
    this.config = (window as any).showcaseConfig;
    if (!this.config || !this.config.backend) {
      throw new Error('Config is not properly initialized');
    }
  }

  getPushConfig() {
    return this.config.push;
  }

  getAuthConfig() {
    return this.config.auth;
  }
}
