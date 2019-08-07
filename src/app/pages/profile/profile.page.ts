import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;

  constructor(private authService: AuthService, public alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  isDisabled() {
    return !this.authService.isEnabled();
  }

  authenticated() {
    return this.profile;
  }

  login() {
    this.authService.login().then(() => {
      this.loadUserProfile();
    }).catch((err) => {
      console.warn('Login failed', err);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.profile = undefined;
    }).catch((err) => {
      console.warn('Login failed', err);
    });
  }

  loadUserProfile() {
    this.authService.getProfile().then((userProfile: any) => {
      const realmRoles = this.authService.auth.getRealmRoles();

      this.profile = {
        username: userProfile.username ? userProfile.username : 'Unknown Username',
        firstName: userProfile.firstName ? userProfile.firstName : 'Unknown First Name',
        lastName: userProfile.lastName ? userProfile.lastName : 'Unknown Last Name',
        id: userProfile.id ? userProfile.id : 'Unknown User ID',
        email: userProfile.email,
        totp: userProfile.totp ? userProfile.totp : false,
        emailVerified: userProfile.emailVerified ? userProfile.emailVerified : false,
        realmRoles,
      };
    }).catch((err) => {
      this.alertCtrl.create({
        message: `Cannot retrieve profile. Please review keycloak client configuration.`,
        header: `Login failed`,
        buttons: ['OK']
      }).then((dialog) => {
        dialog.present();
      }).catch(() => { });
      console.error('Error retrieving user profile', err);
    });
  }

  public ionViewDidEnter(): void {
    this.loadUserProfile();
  }
}
