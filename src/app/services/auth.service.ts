

import { Auth } from '@aerogear/auth';
import { Injectable } from '@angular/core';
import { OpenShiftService } from './openshift.service';
import { KeycloakInitOptions } from 'keycloak-js';
import { HeaderProvider } from '@aerogear/datasync-js';


@Injectable({
    providedIn: 'root'
})
/**
 * Service provides Apollo Voyager client
 */
export class AuthService {
    public authService: Auth | undefined;

    constructor(private openShift: OpenShiftService) {
        if (this.openShift.hasAuthConfig()) {
            this.authService = new Auth();
        }
    }

    init() {
        if (this.openShift.hasAuthConfig()) {
            const initOptions: KeycloakInitOptions = { onLoad: 'login-required' };
            return this.authService.init(initOptions);
        }
        return Promise.reject();
    }

    getAuth() {
        return this.authService;
    }

    headerProvider() {
        const headerProvider: HeaderProvider = () => {
            const tokenUpdate = this.authService.extract().updateToken(10) as any;
            // Keycloak doesn't use a proper promise. Instead it uses success and error.
            return new Promise((resolve, reject) => {
                tokenUpdate.success(() => {
                    resolve({ 'Authorization': 'Bearer ' + this.authService.extract().token });
                }).error((error) => {
                    // tslint:disable-next-line:no-console
                    console.info('Cannot update keycloak token', error);
                    reject(error);
                });
            });
        };
        return headerProvider;
    }
}

