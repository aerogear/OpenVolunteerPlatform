import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Events } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    pushEnabled: any;

  constructor(private storage: Storage,
              public events: Events) {

  }

  async ngOnInit() {
    await this.storage.ready();
    const pushEnabledInStorage = await this.storage.get('pushEnabled');

    // Enable Push if there is no configuration in storage from user yet
    if (pushEnabledInStorage === null || pushEnabledInStorage) {
      this.pushEnabled = true;
    } else {
      this.pushEnabled = false;
    }
  }

  async togglePushEnabled() {
    const pushEnabledInStorage = await this.storage.get('pushEnabled');
    
    if (this.pushEnabled !== pushEnabledInStorage) {
      this.updateValue('pushEnabled', this.pushEnabled);
    }
  }

  private async updateValue(key: string, value: boolean) {
    await this.storage.set(key, value);
    this.events.publish('settings:changed', key, value);
  }

}