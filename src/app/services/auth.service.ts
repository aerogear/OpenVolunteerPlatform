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
    public initialized: Promise<boolean>;

    constructor(private openShift: OpenShiftService) {
        if (this.isEnabled()) {
            this.auth = new Auth(this.openShift.getConfig());
            if (window.cordova) {
                this.initialized = new Promise((resolve, reject) => {
                    // Init for cordova
                    document.addEventListener('deviceready', () => {
                        return this.init().then(resolve).catch(reject);
                    }, false);
                });
            } else {
                // Init for the web
                this.initialized = this.init();
            }
        } else {
            this.initialized = Promise.resolve(true);
        }
    }

    async init() {
        const initOptions: KeycloakInitOptions = { onLoad: 'check-sso' };
        return await this.auth.init(initOptions);
    }

    getAuth() {
        return this.auth;
    }

    isEnabled() {
        return this.openShift.hasAuthConfig();
    }

    authenticated() {
        return this.auth.isAuthenticated();
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            if (this.isEnabled()) {
                this.initialized.then((success) => {
                    if (success && this.auth.isAuthenticated()) {
                        this.auth.extract().loadUserProfile().success((profile) => {
                            resolve(profile);
                        }).error(reject);
                    } else {
                        return reject('Not authenticated');
                    }
                }).catch(reject);
            } else {
                return reject('Not enabled');
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

