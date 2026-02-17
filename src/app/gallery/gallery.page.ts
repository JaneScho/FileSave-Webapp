import { Component } from '@angular/core';
import { IonRow, IonCol, IonGrid, IonItem, IonList, IonButtons, IonButton, IonFab, IonFabButton, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss'],
  imports: [IonCol, IonRow, IonGrid, IonItem, IonList, IonButtons, IonButton, IonFab, IonFabButton, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, ExploreContainerComponent],
})
export class GalleryPage {
  constructor() {}
}
