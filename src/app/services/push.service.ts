import { PushRegistration } from '@aerogear/push';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '@aerogear/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { OpenShiftConfigService } from './config.service';

export interface PushMessage {
  message: string;
  received: string;
}

/**
 * Handles interactions with the push plugin and provides an easy interface
 * to register and unregister from push notifications
 */
@Injectable()
export class PushService {
  constructor(private storage: Storage, public events: Events, private openShift: OpenShiftConfigService) { }

  public async initialize(cb: (notification: PushMessage) => void) {

    PushRegistration.onMessageReceived((notification: any) => {
      cb({message: notification.message, received: new Date().toDateString()});
    });

    this.events.subscribe('settings:changed', (key, value) => {
      console.log('settings changes', key, value);
      if (key === 'pushEnabled') {
        if (value) {
          this.register();
        } else {
          this.unregister();
        }
      }
    });

    await this.storage.ready();

    const pushEnabledInStorage = await this.storage.get('pushEnabled');

    if (pushEnabledInStorage === null || pushEnabledInStorage) {
      this.register();

      if (pushEnabledInStorage === null) {
        await this.storage.set('pushEnabled', true);
      }
    }
  }

  public register() {
    new PushRegistration(this.openShift.getPushConfig())
    .register({
      alias: 'cordova',
      categories: ['ionic', 'showcase']
    }).then(() => {
      console.log('Push registration successful');
    }).catch((err) => {
      console.warn('Push registration unsuccessful');
    });
  }

  public unregister() {
    new PushRegistration(this.openShift.getPushConfig())
    .unregister()
    .then(() => {
      console.log('Successfully unregistered');
    }).catch((err) => {
      console.error('Error unregistering', err);
    });
  }

}
