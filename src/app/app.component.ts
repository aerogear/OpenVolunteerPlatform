import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private user: String;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.initAuth();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private initAuth() {
    return this.auth.init().then(() => {
      return this.auth.authService.extract().loadUserProfile().success((profile) => {
        this.user = profile.username;
      });
    }).catch((error) => {
      if (error) {
        // tslint:disable-next-line:no-console
        console.info('Error when initializing auth', error);
      }
    });
  }

  login() {
    if (this.auth.authService) {
      if (this.auth.authService.isAuthenticated()) {
        this.auth.authService.logout();
      } else {
        this.auth.authService.login();
      }
    }
  }

}
