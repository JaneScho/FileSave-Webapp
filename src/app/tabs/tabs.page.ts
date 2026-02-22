import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonFabList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonMenu, IonLabel, IonFab, IonFabButton, IonButton, IonMenuButton, IonButtons, IonList, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { downloadOutline, closeSharp, pushOutline, cameraOutline, listOutline, imagesOutline, image, folder, shareSocial, search, settings, cloudUploadOutline, barChartOutline, settingsOutline, menuOutline, folderOutline, searchOutline, shareSocialOutline, } from 'ionicons/icons';
import { CameraService } from '../services/phoneData/camera.service';
import { LocationService } from '../services/phoneData/location.service';
import { Upload } from '../services/api/uploadService';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { CapacitorHttp } from '@capacitor/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [RouterLinkActive, RouterLink, IonFabList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonButton, IonMenuButton, IonButtons, IonList, IonContent, IonMenu],
})
export class TabsPage {

  //Extra:
  private http = inject(HttpClient);
  public userName: string = '';


  public environmentInjector = inject(EnvironmentInjector);

  constructor(public cameraService: CameraService, public locationService: LocationService, public uploadService: Upload) {
    addIcons({ imagesOutline, menuOutline, searchOutline, folderOutline, closeSharp, pushOutline, cameraOutline, listOutline, shareSocialOutline, image, folder, shareSocial, search, settings, cloudUploadOutline });
  }

  async takeNewPhoto(){

    try {
    const location = await this.locationService.getLocationName();
    console.log('Current location:', location);

    const formData = await this.cameraService.takeNewPicture();

    const tags: string[] = [location];

    this.uploadService.uploadFile(
      "gallery",
      formData.get('file') as Blob,
      formData.get('filename') as string,
      formData.get('fileType') as string,
      'APPEND_NUMBER',
      tags
    ).subscribe({
      next: (res) => console.log('Upload Success:', res),
      error: (err) => console.error('Upload Error:', err)
    });

  } catch (err) {
    console.error('Process failed:', err);
  }
  }
}
