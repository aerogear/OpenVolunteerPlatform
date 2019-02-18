import { Auth } from '@aerogear/auth';
import { Injectable } from '@angular/core';
import { OpenShiftService } from './openshift.service';
import { KeycloakInitOptions } from 'keycloak-js';
import { AuthContextProvider } from '@aerogear/voyager-client';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class AuthService {
    public auth: Auth | undefined;
    public initialized: Promise<boolean>;

    constructor(private openShift: OpenShiftService, public platform: Platform) {
        if (this.isEnabled()) {
            this.auth = new Auth(this.openShift.getConfig());
            this.initialized = platform.ready().then(() => {
                const initOptions: KeycloakInitOptions = { onLoad: 'login-required' };
                return this.auth.init(initOptions);
            });
        }
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
                return this.initialized.then((success) => {
                    if (success && this.auth.isAuthenticated()) {
                        this.auth.extract().loadUserProfile().success((profile) => {
                            resolve(profile);
                        }).error(reject);
                    } else {
                        return reject('Not authenticated');
                    }
                }).catch((err) => {
                    reject(err);
                });
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

