import { ToastController } from '@ionic/angular';

/**
 * Base page with helpers for handling offline state
 */
export class OfflineNotifier {

  constructor(
    private toastController: ToastController
  ) { }

  protected handleOfflineMutation(error: any) {
    if (error.networkError && error.networkError.offline) {
      this.presentToast('New object added to offline queue');
      const offlineError = error.networkError;
      offlineError.watchOfflineChange().then((result) => {
        console.log('Offline change replicated', result);
        this.presentToast('New object replicated to server');
      }).catch(err => {
        console.log('Error when replicating change to server', err);
      });
    }
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
