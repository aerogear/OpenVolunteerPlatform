import { init, AeroGearApp } from '@aerogear/app';
import { Injectable } from '@angular/core';

const config = require('../../mobile-services.json');

export enum Service {
  Sync,
  Push,
  Auth
}

@Injectable({
  providedIn: 'root'
})

/**
 * Service that manages OpenShift specific configuration
 */
export class OpenShiftConfigService {
  app: AeroGearApp;

  constructor() {
    this.app = init(config);
  }

  getConfig() {
    return this.app.config;
  }

  getSyncConfig() {
    return config.services.find((service) =>
      service.type === 'sync-app');
  }

  getPushConfig() {
    return config.services.find((service) =>
      service.type === 'push');
  }

  getAuthConfig() {
    return config.services.find((service) =>
      service.type === 'keycloak');
  }

  getServerUrl() {
    const syncConfig = (config.services.find((service) =>
      service.type === 'sync-app'));
    if (syncConfig) {
      return syncConfig.url;
    }
    return this.getLocalServerUrl();
  }

  getLocalServerUrl() {
    return 'http://localhost:4000/graphql';
  }

  getWSLocalServerUrl() {
    return 'ws://localhost:4000/graphql';
  }

}

