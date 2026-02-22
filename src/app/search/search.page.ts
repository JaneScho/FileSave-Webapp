import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IonFab, IonFabButton, IonFabList, IonButton, IonIcon, IonChip, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonRow } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { Download } from '../services/api/download';
import { Observable } from 'rxjs';
import { FileListDTO } from '../services/interfaces/dtos';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/api/security/auth';
import { SearchListItemOverviewComponent } from '../components/search-list-item-overview/search-list-item-overview.component';
import { SearchListItemComponent } from '../components/search-list-item/search-list-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [IonRow, AsyncPipe, RouterLink, FormsModule,
    SearchListItemOverviewComponent, SearchListItemComponent,
    IonFabList, IonFab, IonFabButton, IonButton, IonIcon, IonChip, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar],
})
export class SearchPage implements OnInit{

  files$!: Observable<FileListDTO[]>;
  selectedFile !: FileListDTO;
  @ViewChild('popup') popup !: SearchListItemOverviewComponent;
  showPopup: Boolean = false;

  constructor(public downloadService: Download, public auth: AuthService, private router: Router) {}

  ngOnInit(){
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  listItemSelected(fileData: FileListDTO) {
        this.showPopup = true;
        this.selectedFile = fileData;
  }

  hidePopup() {
    this.showPopup = false;
  }

  searchTag: string = '';

triggerSearch() {
  const tag = this.searchTag.trim();
  
  if (tag) {
    this.files$ = this.downloadService.getFilesForTags([tag]);
  }
}

}
