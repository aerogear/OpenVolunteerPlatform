import { Auth } from '@aerogear/auth';
import { Injectable } from '@angular/core';
import { ShowcaseConfigService } from './config.service';
import { KeycloakInitOptions } from 'keycloak-js';
import { AuthContextProvider } from '@aerogear/voyager-client';
import { Platform } from '@ionic/angular';
import { AuthStateService } from './auth-state.service';

@Injectable({
    providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class AuthService {
    public auth: Auth | undefined;
    public initialized: Promise<boolean>;
    private authState: AuthStateService;

    constructor(private configService: ShowcaseConfigService, public platform: Platform, authState: AuthStateService) {
        const config = this.configService.getAuthConfig();
        if (!!config) {
            this.auth = new Auth(config);
            this.authState = authState;
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
        return !!this.configService.getAuthConfig();
    }

    authenticated() {
        return this.auth.isAuthenticated();
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            if (this.isEnabled()) {

                return this.initialized.then((success) => {
                    if (success && this.auth.isAuthenticated()) {
                        this.auth.loadUserProfile().then(resolve).catch(reject);
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
            this.authState.logout();
            return this.auth.logout();
        } else {
            return Promise.reject('not enabled');
        }
    }

    getAuthContextProvider(): Promise<AuthContextProvider | undefined> {
        if (this.isEnabled()) {
            return this.initialized.then((success) => {
                if (success) {
                    return this.auth.getAuthContextProvider();
                }
                return undefined;
            }).catch((error) => {
                return undefined;
            });
        }
        return undefined;
    }
}

