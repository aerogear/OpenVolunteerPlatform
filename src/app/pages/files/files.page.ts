import { Component, OnInit } from '@angular/core';
import { FileEntry } from '../../services/file/types';
import { FileService } from '../../services/file/file.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { OpenShiftConfigService } from '../../services/config.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {
  private items: Array<FileEntry>;
  private files: FileList;
  baseURL: string;

  constructor(public fileService: FileService,
    public alertCtrl: AlertController,
    public auth: AuthService, openShift: OpenShiftConfigService) {
    // Note: File Endpoint assume that server returns relative paths to files
    this.baseURL = new URL(openShift.getServerUrl()).origin;
  }

  async ngOnInit() {
    await this.auth.initialized;
    this.refreshData();

  }

  refreshData() {
    this.fileService.getItems().then((items) => {
      if (items.data) {
        const uploads = items.data.uploads;
        if (uploads) {
          uploads.forEach((item) => item.url = `${this.baseURL}${item.url}`);
        }
        this.items = items.data.uploads;
      }
    }).catch((err) => {
      this.alertCtrl.create({
        message: `Cannot fetch files. Please make sure you are online.`,
        header: `Fetching files`,
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
      console.log('Error when fetching files', err);
    });
  }

  uploadFile({ target }) {
    console.log(target.files[0]);
    this.fileService.createFile(target.files[0]).then(() => {
      this.refreshData();
      this.files = undefined;
    }).catch((err) => {
      this.alertCtrl.create({
        message: `Cannot save file. Please make sure you are online.`,
        header: `Saving file`,
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
      console.log('Problem with uploading file ', err);
    });
  }

}
