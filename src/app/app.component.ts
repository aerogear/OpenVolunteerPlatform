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
  private user;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService
  ) {
  }

  public async ionViewDidLoad() {
    await this.initAuth();
    await this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private initAuth() {
    return this.auth.init().then(() => {
      return this.auth.authService.extract().loadUserProfile().success((profile) => {
        this.user = profile;
      });
    }).catch((error) => {
      if (error) {
        // tslint:disable-next-line:no-console
        console.info('Error when initializing auth', JSON.stringify(error));
      }
    });
  }
}
