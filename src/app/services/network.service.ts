import { CordovaNetworkStatus, WebNetworkStatus, NetworkStatus } from '@aerogear/datasync-js';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
/**
 * Helper service to show how SDK tracking the network status on different platforms.
 */
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
