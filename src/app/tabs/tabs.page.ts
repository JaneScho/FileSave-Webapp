import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonFabList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeSharp, pushOutline, cameraOutline, listOutline, imagesOutline, image, folder, shareSocial, search, settings, cloudUploadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonFabList, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ closeSharp, pushOutline, cameraOutline, listOutline, imagesOutline, image, folder, shareSocial, search, settings, cloudUploadOutline });
  }
}
