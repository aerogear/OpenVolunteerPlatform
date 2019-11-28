import { CordovaNetworkStatus, WebNetworkStatus, NetworkStatus } from 'offix-client-boost';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
/**
 * Helper service to show how SDK tracking the network status on different platforms.
 */
// TODO - should be part of the SDK
export class NetworkService {
    public networkInterface: NetworkStatus;
    constructor() {
        if (window.cordova) {
            this.networkInterface = new CordovaNetworkStatus();
        } else {
            this.networkInterface = new WebNetworkStatus();
        }
    }
}
