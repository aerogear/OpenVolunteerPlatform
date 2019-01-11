

import { Auth } from '@aerogear/auth';
import { Injectable } from '@angular/core';
import { OpenShiftService } from './openshift.service';
import { KeycloakInitOptions } from 'keycloak-js';


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
        const headerProvider = () => {
            const tokenUpdate = this.authService.extract().updateToken(10) as any;
            return tokenUpdate.then(() => {
                return { 'Authorization': 'Bearer ' + this.authService.extract().token };
            }).catch((error) => {
                // tslint:disable-next-line:no-console
                console.info('Cannot update keycloak token');
            });
        };
        return headerProvider;
    }
}

