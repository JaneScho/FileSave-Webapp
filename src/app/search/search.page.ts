import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IonButton, IonIcon, IonChip, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonRow } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { Download } from '../services/api/download';
import { Observable } from 'rxjs';
import { FileListDTO } from '../services/interfaces/dtos';
import { Router } from '@angular/router';
import { AuthService } from '../services/api/security/auth';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [IonRow, AsyncPipe,
    IonButton, IonIcon, IonChip, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar],
})
export class SearchPage implements OnInit{

  files$!: Observable<FileListDTO[]>;

  constructor(public downloadService: Download, public auth: AuthService, private router: Router) {}

  ngOnInit(){
    this.loadFiles();
  }

  loadFiles(){
    this.files$ = this.downloadService.getFileList("gallery");
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}
