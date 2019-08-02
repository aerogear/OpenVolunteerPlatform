import { init, AeroGearApp } from '@aerogear/app';
import { Injectable } from '@angular/core';

const config = require('../../mobile-services.json');

export enum Service {
  Metrics,
  Sync,
  Push,
  Auth,
  Security
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

  hasSyncConfig() {
    return !!(config.services.find((service) =>
      service.type === 'sync-app'));
  }

  hasAuthConfig() {
    return !!(config.services.find((service) =>
      service.type === 'keycloak'));
  }

  hasSecurityConfig() {
    return !!(config.services.find((service) =>
      service.type === 'security'));
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

  getConfiguration(type: Service) {
    switch (type) {
      case Service.Metrics: return this.getConfig().getConfigByType('metrics');
      case Service.Sync: return this.getConfig().getConfigByType('sync-app');
      case Service.Auth: return this.getConfig().getConfigByType('keycloak');
      case Service.Push: return this.getConfig().getConfigByType('push');
      case Service.Security: return this.getConfig().getConfigByType('security');
    }
  }
}

