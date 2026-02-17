import { Component } from '@angular/core';
import { IonSearchbar, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.page.html',
  styleUrls: ['upload.page.scss'],
  imports: [IonSearchbar, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class UploadPage {
  constructor() {}
}
