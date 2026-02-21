import { FileListDTO } from './../services/interfaces/dtos';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FileListItemComponent } from '../components/file-list-item/file-list-item.component';

@Component({
  selector: 'app-private',
  templateUrl: 'private.page.html',
  styleUrls: ['private.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, FileListItemComponent]
})
export class PrivatePage {
  files: FileListDTO[] = []

  constructor() {
    this.files = [{filename: 'TestFile.txt', filepath: '/', isFolder: false, tags: []} as FileListDTO, 
                  {filename: 'Bob.txt', filepath: '/', isFolder: false, tags: []} as FileListDTO,
                  {filename: 'BobFolder', filepath: '/', isFolder: true, tags: []} as FileListDTO]
  }

  listItemSelected(fileData: FileListDTO){
    if(fileData.isFolder){
      //TODO Navigate to new folder
    }
    else{
      //TODO show popup for file
    }
  }
}
