import { AppSecurity } from '@aerogear/security';
import { Injectable } from '@angular/core';
import { OpenShiftConfigService } from './config.service';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class SecurityService {
  public security: AppSecurity | undefined;
  public initialized: Promise<boolean>;

  constructor(private openShift: OpenShiftConfigService, public platform: Platform) {
      if (this.isEnabled()) {
          this.security = new AppSecurity(this.openShift.getConfig());
      }
  }

  getConfig() {
    if (this.isEnabled()) {
      return this.security.getConfig();
    }
    console.log('No Security Service config present in mobile-services.js');
    return undefined;
  }

  public async clientInit() {
    return this.security.clientInit();
  }

  getAuth() {
    return this.security;
  }

  isEnabled() {
      return this.openShift.hasSecurityConfig();
  }
}

