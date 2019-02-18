import { Auth } from '@aerogear/auth';
import { Injectable } from '@angular/core';
import { OpenShiftService } from './openshift.service';
import { KeycloakInitOptions } from 'keycloak-js';
import { AuthContextProvider } from '@aerogear/voyager-client';

@Injectable({
    providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class AuthService {
    public auth: Auth | undefined;

    constructor(private openShift: OpenShiftService) {
        if (this.openShift.hasAuthConfig()) {
            const auth = new Auth(this.openShift.getConfig());
            const initOptions: KeycloakInitOptions = { onLoad: 'check-sso' };
            auth.init(initOptions);
            this.auth = auth;
        }
    }

    getAuth() {
        return this.auth;
    }

    isEnabled() {
        return !!this.auth;
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            if (this.isEnabled() && this.auth.isAuthenticated()) {
                this.auth.extract().loadUserProfile().success((profile) => {
                    resolve(profile);
                }).error(reject);
            } else {
                reject('Not enabled');
            }
        });
    }

    loginOrLogout(): any {
        if (this.isEnabled()) {
            if (this.auth.isAuthenticated()) {
                this.auth.logout();
            } else {
                this.auth.login();
            }
        }
    }
    getAuthContextProvider(): AuthContextProvider | undefined {
        if (this.isEnabled()) {
            return this.auth.getAuthContextProvider();
        }
        return undefined;
    }
}

