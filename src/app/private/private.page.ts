import { FileListDTO } from './../services/interfaces/dtos';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FileListItemComponent } from '../components/file-list-item/file-list-item.component';
import { FilePopupComponent } from "../components/file-popup/file-popup.component";

@Component({
  selector: 'app-private',
  templateUrl: 'private.page.html',
  styleUrls: ['private.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FileListItemComponent, FilePopupComponent]
})
export class PrivatePage {
  @ViewChild('popup') popup !: FilePopupComponent;
  showPopup: Boolean = false;
  files: FileListDTO[] = [];
  selectedFile !: FileListDTO; 

  constructor(private cdr: ChangeDetectorRef) {
    this.files = [{filename: 'TestFile.txt', filepath: '/', isFolder: false, tags: ['testTag', 'testTag2', "aawdawdaw", "bawdawda", "boadawdawdawdawd"]} as FileListDTO, 
                  {filename: 'Bob.txt', filepath: '/', isFolder: false, tags: []} as FileListDTO,
                  {filename: 'BobFolder', filepath: '/', isFolder: true, tags: []} as FileListDTO]
  }

  listItemSelected(fileData: FileListDTO){
    if(fileData.isFolder){
      //TODO Navigate to new folder
    }
    else{
      //TODO show popup for file
      this.showPopup = true;
      this.selectedFile = fileData;
      this.cdr.detectChanges();
    }
  }

  hidePopup(){
    this.showPopup = false;
    this.cdr.detectChanges();
  }
}
