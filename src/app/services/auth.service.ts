import { Auth } from '@aerogear/auth';
import { Injectable } from '@angular/core';
import { OpenShiftConfigService } from './config.service';
import { VoyagerService } from './sync/voyager.service';
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
    private readonly aerogear: VoyagerService;

    constructor(private openShift: OpenShiftConfigService, public platform: Platform, aerogear: VoyagerService) {
        if (this.isEnabled()) {
            this.auth = new Auth(this.openShift.getConfig());
            this.aerogear = aerogear;
            this.initialized = platform.ready().then(() => {
                const initOptions: KeycloakInitOptions = { onLoad: 'login-required' };
                return this.auth.init(initOptions);
            }).catch((error) => {
                console.warn(`Failed to intialize keycloak
Please review your keycloak client configuration on keycloak server
and check if you have setup proper "Valid Redirect URIs" and "Web Origins" values`);
                return false;
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

    login(): Promise<void> {
        if (this.isEnabled()) {
            return this.auth.login();
        } else {
            return Promise.reject('not enabled');
        }
    }

    logout() {
        if (this.isEnabled()) {
            this.aerogear.apolloClient.clearStore();
            this.aerogear.apolloClient.cache.reset();
            window.localStorage.clear();
            return this.auth.logout();
        } else {
            return Promise.reject('not enabled');
        }
    }

    getAuthContextProvider(): AuthContextProvider | undefined {
        if (this.isEnabled()) {
            return this.auth.getAuthContextProvider();
        }
        return undefined;
    }
}

