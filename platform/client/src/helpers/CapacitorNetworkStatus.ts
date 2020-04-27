import { NetworkStatus, NetworkStatusChangeCallback } from "offix-offline";
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;

/**
 * Web networks status implementation based on: Mozilla
 * See: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 */
export class CapacitorNetworkStatus implements NetworkStatus {

  listeners: NetworkStatusChangeCallback[] = [];

  constructor() {
    Network.addListener("networkStatusChange", this.handleNetworkStatusChange.bind(this));
  }

  public addListener(listener: NetworkStatusChangeCallback): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: NetworkStatusChangeCallback): void {
    const index = this.listeners.indexOf(listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  public isOffline(): Promise<boolean> {
    return new Promise(async (resolve) => {
      let status = await Network.getStatus();
      // @ts-ignore
      resolve(!status.connected);
    });
  }

  private handleNetworkStatusChange(status: any) {
    const online = status.connected;
    this.listeners.forEach((listener) => {
      listener({ online });
    });
  }
}
