import { Injectable } from '@angular/core';
import { ShowcaseConfigService } from './config.service';
import { KeycloakInstance, KeycloakInitOptions } from 'keycloak-js';
import { AuthContextProvider } from '@aerogear/voyager-client';
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
                console.warn(`Failed to intialize keycloak
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

    getAuthContextProvider(): Promise<AuthContextProvider | undefined> {
        if (this.isEnabled()) {
            return this.initialized.then((success) => {
                if (success) {
                    return () => {
                        const tokenUpdate = this.keycloak.updateToken(30) as any;
                        // Keycloak doesn't use a proper promise. Instead it uses success/error.
                        return new Promise<AuthContext>((resolve, reject) => {
                            tokenUpdate.success(() => {
                                if (this.keycloak.token) {
                                    resolve({
                                        headers: {
                                            'Authorization': 'Bearer ' + this.keycloak.token
                                        }
                                    });
                                } else {
                                    reject('No keycloak token available');
                                }
                            }).error((error: any) => {
                                // tslint:disable-next-line: no-console
                                console.info('Cannot update keycloak token', error);
                                reject(error);
                            });
                        });
                    };
                }
                return undefined;
            }).catch((error) => {
                return undefined;
            });
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
