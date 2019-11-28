import { Injectable } from '@angular/core';
import { ShowcaseConfigService } from './config.service';
import { KeycloakInstance, KeycloakInitOptions } from 'keycloak-js';
import { AuthContextProvider } from 'offix-client-boost';
import { Platform } from '@ionic/angular';
import { AuthStateService } from './auth-state.service';

const Keycloak = require('keycloak-js');

@Injectable({
    providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class AuthService {
    private keycloak: KeycloakInstance<'native'> | undefined;
    public initialized: Promise<boolean>;
    private authState: AuthStateService;

    constructor(private configService: ShowcaseConfigService, public platform: Platform, authState: AuthStateService) {
        const config = configService.getAuthConfig();
        if (!!config) {
            this.keycloak = new Keycloak({ ...config });
            this.authState = authState;
            this.initialized = platform.ready().then(() => {
                const initOptions: KeycloakInitOptions = {
                    onLoad: 'login-required',
                    promiseType: 'native'
                };
                return this.keycloak.init(initOptions);
            }).catch((error) => {
                console.warn(`Failed to initialize keycloak
Please review your keycloak client configuration on keycloak server
and check if you have setup proper "Valid Redirect URIs" and "Web Origins" values`);
                return false;
            });
        }
    }

    getAuth() {
        return this.keycloak;
    }

    isEnabled() {
        return !!this.configService.getAuthConfig();
    }

    authenticated() {
        return this.keycloak.authenticated;
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            if (this.isEnabled()) {
                return this.initialized.then((success) => {
                    if (success && this.keycloak.authenticated) {
                        this.keycloak.loadUserProfile().then(resolve).catch(reject);
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
            return this.keycloak.login();
        } else {
            return Promise.reject('not enabled');
        }
    }

    /**
   * Return the users realm level roles
   */
    public getRealmRoles(): string[] {
        if (this.keycloak.realmAccess && this.keycloak.realmAccess.roles) {
            return this.keycloak.realmAccess.roles;
        }
        return [];
    }

    logout() {
        if (this.isEnabled()) {
            this.authState.logout();
            return this.keycloak.logout();
        } else {
            return Promise.reject('not enabled');
        }
    }

    async getAuthContextProvider(): Promise<AuthContextProvider | undefined> {
        if (this.isEnabled() && await this.initialized) {
            return async () => {
                await this.keycloak.updateToken(50);
                if (this.keycloak.token) {
                    return {
                        headers: {
                            'Authorization': 'Bearer ' + this.keycloak.token
                        }
                    };
                } else {
                    throw Error('No keycloak token available');
                }
            };
        }
        return undefined;
    }
}

/**
 * Abstracts auth headers
 */
export interface AuthContext {
    headers: {
        Authorization: string
    };
}
