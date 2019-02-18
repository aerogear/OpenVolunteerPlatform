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
        if (this.isEnabled()) {
            this.auth = new Auth(this.openShift.getConfig());
            if (window.cordova) {
                // Init for cordova
                document.addEventListener('deviceready', this.init, false);
            } else {
                // Init for the web
                this.init();
            }
        }
    }

    async init() {
        const initOptions: KeycloakInitOptions = { onLoad: 'check-sso' };
        await this.auth.init(initOptions);
    }

    getAuth() {
        return this.auth;
    }

    isEnabled() {
        return this.openShift.hasAuthConfig();
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

