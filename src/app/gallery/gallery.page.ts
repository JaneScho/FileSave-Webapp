import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IonInput, IonModal, IonChip, IonLabel, IonRow, IonCol, IonGrid, IonItem, IonList, IonButtons, IonButton, IonFab, IonFabButton, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';

import { Download } from '../services/api/download';
import { Observable } from 'rxjs';
import { FileListDTO } from '../services/interfaces/dtos';

@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss'],
  imports: [AsyncPipe, FormsModule,
    IonInput, IonModal, IonChip, IonLabel, IonCol, IonRow, IonGrid, IonItem, IonList, IonButtons, IonButton, IonFab, IonFabButton, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, ExploreContainerComponent],
})
export class GalleryPage implements OnInit{

  files$!: Observable<FileListDTO[]>;
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  
    constructor(public downloadService: Download) {}
  
    ngOnInit(){
      this.loadFiles();
    }
  
    loadFiles(){
      this.files$ = this.downloadService.getFileList("gallery");
    }


    //...
    cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
  
}
