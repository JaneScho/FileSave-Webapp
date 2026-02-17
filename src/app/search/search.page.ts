import { Component } from '@angular/core';
import { IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, ExploreContainerComponent],
})
export class SearchPage {
  constructor() {}
}
