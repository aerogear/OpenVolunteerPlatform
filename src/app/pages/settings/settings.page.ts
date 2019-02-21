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
    this.pushEnabled = await this.storage.get('pushEnabled');
  }

  togglePushEnabled() {
    this.updateValue('pushEnabled', this.pushEnabled);
  }

  private async updateValue(key: string, value: any) {
    await this.storage.set(key, value);
    this.events.publish('settings:changed', key, value);
  }

}
