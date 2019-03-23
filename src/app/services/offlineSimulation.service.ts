import { Injectable } from "@angular/core";
const config = require("../../mobile-services.js");
import { Events } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class OfflineToggleService {
  private online: boolean;
  public offlineToggle: boolean;
  private callback: any;

  constructor(private storage: Storage, public events: Events) {
    this.online = true;
  }

  onStatusChangeListener(callback) {
    this.callback = callback;
  }

  isOffline(): Promise<boolean> {
    const online = this.online;
    return new Promise(resolve => resolve(!online));
  }

  setOnline(online) {
    this.online = online;
    this.callback && this.callback.onStatusChange({ online });
  }

  public async initialize() {
    this.events.subscribe("settings:changed", (key, value) => {
      console.log("settings changes", key, value);
      if (key === "offlineToggleEnabled") {
        if (value) {
          this.offlineToggle = true;
          console.log("The offline toggle feature is enabled");
        } else {
          this.offlineToggle = false;
          console.log("The offline toggle feature is DISabled");
        }
      }
    });

    await this.storage.ready();
    const offlineToggleEnabledInStorage = await this.storage.get(
      "offlineToggleEnabled"
    );

    if (
      offlineToggleEnabledInStorage === null ||
      offlineToggleEnabledInStorage
    ) {
      this.offlineToggle = true;

      if (offlineToggleEnabledInStorage === null) {
        await this.storage.set("offlineToggleEnabled", true);
        this.offlineToggle = true;
      }
    }
  }
}
