import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IonButton, IonIcon, IonChip, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { Download } from '../services/api/download';
import { Observable } from 'rxjs';
import { FileListDTO } from '../services/interfaces/dtos';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [AsyncPipe,
    IonButton, IonIcon, IonChip, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, ExploreContainerComponent],
})
export class SearchPage implements OnInit{

  files$!: Observable<FileListDTO[]>;

  constructor(public downloadService: Download) {}

  ngOnInit(){
    this.loadFiles();
  }

  loadFiles(){
    this.files$ = this.downloadService.getFileList("gallery");
  }


}
