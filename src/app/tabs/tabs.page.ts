import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonFabList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeSharp, pushOutline, cameraOutline, listOutline, imagesOutline, image, folder, shareSocial, search, settings, cloudUploadOutline } from 'ionicons/icons';
import { CameraService } from '../services/camera.service';
import { LocationService } from '../services/location.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonFabList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton],
})
export class TabsPage {

  //Extra:
  private http = inject(HttpClient);
  public userName: string = '';


  public environmentInjector = inject(EnvironmentInjector);

  constructor(public cameraService : CameraService, public locationService : LocationService) {
    addIcons({ closeSharp, pushOutline, cameraOutline, listOutline, imagesOutline, image, folder, shareSocial, search, settings, cloudUploadOutline });
  }

  async takeNewPhoto(){
    this.http.get<any>('http://indigo-bat-40212.zap.cloud:4582/api/auth/whoami')
      .subscribe({
        next: (data) => {
          this.userName = data.username; // Should be "Chantal"
          console.log('Current location: ', this.userName )
        },
        error: (err) => {
          console.error('Auth failed or CORS error', err);
          this.userName = 'Unknown User';
        }
      });
    /*
    const location = await this.locationService.getLocationName();

    console.log('Current location: ', location )
    
    //cameraService ist noch nicht fertig -> sollte formData zurueckgeben
    //der Tag wird dann noch mit 'location' hinzugefuegt
    this.cameraService.takeNewPicture();
    */
  }
}
