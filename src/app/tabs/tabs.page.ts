import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonFabList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonMenu, IonLabel, IonFab, IonFabButton, IonButton, IonMenuButton, IonButtons, IonList, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeSharp, pushOutline, cameraOutline, listOutline, imagesOutline, image, folder, shareSocial, search, settings, cloudUploadOutline, barChartOutline, settingsOutline, menuOutline, folderOutline, searchOutline, shareSocialOutline, } from 'ionicons/icons';
import { CameraService } from '../services/camera.service';
import { LocationService } from '../services/location.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HttpClient } from '@angular/common/http';

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

  constructor(public cameraService: CameraService, public locationService: LocationService) {
    addIcons({ imagesOutline, menuOutline, searchOutline, folderOutline, closeSharp, pushOutline, cameraOutline, listOutline, shareSocialOutline, image, folder, shareSocial, search, settings, cloudUploadOutline });
  }

  async takeNewPhoto(){
    /*
    this.http.get<any>('http://indigo-bat-40212.zap.cloud:4582/api/auth/whoami')
      .subscribe({
        next: (data) => {
          this.userName = data.username;
          console.log('Current location: ', this.userName )
        },
        error: (err) => {
          console.error('Auth failed or CORS error', err);
          this.userName = 'Unknown User';
        }
      });
    */
   
    //eigentlicher code
    const location = await this.locationService.getLocationName();

    console.log('Current location: ', location)

    //cameraService ist noch nicht fertig -> sollte formData zurueckgeben
    //der Tag wird dann noch mit 'location' hinzugefuegt
    const formData = await this.cameraService.takeNewPicture();

    //Tag hinzufuegen
  }
}
