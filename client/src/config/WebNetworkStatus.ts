import { NetworkStatusChangeCallback, NetworkStatus } from "offix-client";

export class WebNetworkStatus implements NetworkStatus {

  listeners: NetworkStatusChangeCallback[] = [];

  constructor() {
    window.addEventListener("online", this.handleNetworkStatusChange.bind(this), false);
    window.addEventListener("offline", this.handleNetworkStatusChange.bind(this), false);
  }

  public onStatusChangeListener(listener: NetworkStatusChangeCallback) {
    this.listeners.push(listener);
  }

  public removeListener(listener: NetworkStatusChangeCallback) {
    const index = this.listeners.indexOf(listener);
    if (index > 0) {
      this.listeners.splice(index, 1);
    }
  }

  public isOffline(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(!window.navigator.onLine);
    });
  }

  private handleNetworkStatusChange() {
    const online = window.navigator.onLine;
    this.listeners.forEach((listener) => {
      listener.onStatusChange({ online });
    });
  }
}