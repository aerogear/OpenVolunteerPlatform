import { PushRegistration } from '@aerogear/push';
import { Injectable } from '@angular/core';
import { Push, PushObject } from '@ionic-native/push/ngx';
import { ConfigurationService } from '@aerogear/core';
const config = require('../../mobile-services.js');

const PUSH_ALIAS = 'cordova';

export interface PushMessage {
  title: string;
  message: string;
  received: string;
}

/**
 * Handles interactions with the push plugin and provides an easy interface
 * to register and unregister from push notifications
 */
@Injectable()
export class PushService {
  public static registered = false;

  // We want one single instance & callback app wide
  public static pushObject: PushObject = null;

  // The callback to be triggered when a push notification is received
  public static callback: (notification: PushMessage) => void;

  private pushError: Error;

  constructor(private push: Push) { }

  public initialize(cb: (notification: PushMessage) => void) {
    this.initPush();
    PushService.callback = cb;
    this.register();
  }

  private initPush() {
    PushService.pushObject = this.push.init({
      android: {},
      ios: {
        alert: true,
        badge: true,
        sound: true,
      },
    });
  }

  private emit(notification: PushMessage) {
    if (PushService.callback) {
      PushService.callback(notification);
    }
  }

  // No longer receive notifications
  public unregister() {
    PushService.pushObject.unregister().then(() => {
      PushService.registered = false;
      console.log('Successfully unregistered');
    }).catch(() => {
      console.error('Error unregistering');
    });
  }

  public register() {
    PushService.pushObject.on('error').subscribe((err) => {
      this.pushError = err;
      console.error(`Error configuring push notifications ${err.message}`);
    });

    // Invokes the UPS registration endpoint
    PushService.pushObject.on('registration').subscribe((data) => {
      new PushRegistration(new ConfigurationService(config)).register(data.registrationId, PUSH_ALIAS).then(() => {
        PushService.registered = true;
        console.log('Push registration successful');
      }).catch((err) => {
        this.pushError = err;
        console.error('Push registration unsuccessful ', this.pushError);
      });
    });

    PushService.pushObject.on('notification').subscribe((notification) => {
      const newNotification = {
        title: notification.title,
        message: notification.message,
        received: new Date().toDateString(),
      };
      this.emit(newNotification);
    });
  }

  public getError() {
    return this.pushError;
  }

  public isRegistered() {
    return PushService.registered;
  }
}
