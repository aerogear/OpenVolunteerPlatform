import { init, AeroGearApp } from '@aerogear/app';
import { Injectable } from '@angular/core';

const config = require('../../mobile-services.json');

export enum Service {
    Metrics,
    Sync,
    Push,
    Auth
}

@Injectable({
  providedIn: 'root'
})

/**
 * Service that initializes OpenShift specific SDK's
 */
export class OpenShiftService {
  app: AeroGearApp;

  constructor() {
    this.app = init(config);
  }

  getConfig() {
    return this.app.config;
  }

  hasSyncConfig() {
    return !!(config.services.find((service) =>
      service.type === 'sync-app'));
  }

  hasAuthConfig() {
    return !!(config.services.find((service) =>
      service.type === 'keycloak'));
  }

  getConfiguration(type: Service) {
    switch (type) {
      case Service.Metrics: return this.getConfig().getConfigByType('metrics');
      case Service.Sync: return this.getConfig().getConfigByType('sync-app');
      case Service.Auth: return this.getConfig().getConfigByType('keycloak');
      case Service.Push: return this.getConfig().getConfigByType('push');
    }
  }
}

