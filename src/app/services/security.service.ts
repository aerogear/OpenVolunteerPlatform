import { AppSecurity } from '@aerogear/security';
import { Injectable } from '@angular/core';
import { OpenShiftService } from './openshift.service';
import { VoyagerService } from './sync/voyager.service';
import { AuthContextProvider } from '@aerogear/voyager-client';
import { Platform } from '@ionic/angular';
import { getUrl } from '@ionic/angular/dist/directives/navigation/stack-utils';

@Injectable({
    providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class SecurityService {
  public security: AppSecurity | undefined;
  public initialized: Promise<boolean>;
  private readonly aerogear: VoyagerService;

  constructor(private openShift: OpenShiftService, public platform: Platform, aerogear: VoyagerService) {
      if (this.isEnabled()) {
          this.security = new AppSecurity(this.openShift.getConfig());
          this.aerogear = aerogear;
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

