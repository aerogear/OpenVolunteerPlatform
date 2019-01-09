import { init } from '@aerogear/app';
import { Injectable } from '@angular/core';

const config = require('../../mobile-services.js');

@Injectable({
  providedIn: 'root'
})
/**
 * Service that initializes OpenShift specific SDK's
 */
export class OpenShiftService {

  constructor() {
    init(config);
  }

  getConfig() {
    return config;
  }

  hasSyncConfig() {
    return !!(config.services.find((service) =>
      service.name === 'sync'));
  }

  hasAuthConfig() {
    return !!(config.services.find((service) =>
      service.name === 'auth'));
  }
}

