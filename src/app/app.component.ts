import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { PushMessage, PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private user;

  // true if the application is running in background
  private background = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    public auth: AuthService,
    private pushService: PushService
  ) {
    this.auth.getProfile().then((profile) => {
      this.user = profile;
    }).catch((e) => {
      console.log('Cannot get profile: ', e);
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Initialize the push service
      this.pushService.initialize(this.handleNotification.bind(this));

      if (document) {
        document.addEventListener('deviceready', () => {
          document.addEventListener('pause', () => { this.background = true; }, false);
          document.addEventListener('resume', () => { this.background = false; }, false);
        }, false);
      }
    });
  }

  private handleNotification(notification: PushMessage) {
    if (this.background) {
      // if the application is running in background, move to the task page
      this.navCtrl.navigateForward('tasks');
    }
  }
}
