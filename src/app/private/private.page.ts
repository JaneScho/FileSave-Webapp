import { FileListDTO } from './../services/interfaces/dtos';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FileListItemComponent } from '../components/file-list-item/file-list-item.component';
import { FilePopupComponent } from "../components/file-popup/file-popup.component";
import { Observable } from 'rxjs';
import { Download } from '../services/api/download';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-private',
  templateUrl: 'private.page.html',
  styleUrls: ['private.page.scss'],
  imports: [AsyncPipe,
    IonHeader, IonToolbar, IonTitle, IonContent, FileListItemComponent, FilePopupComponent]
})
export class PrivatePage implements OnInit{
  @ViewChild('popup') popup !: FilePopupComponent;
  showPopup: Boolean = false;
  //files: FileListDTO[] = [];
  files$!: Observable<FileListDTO[]>;
  selectedFile !: FileListDTO; 

  currentPath: string = '';

  constructor(private cdr: ChangeDetectorRef, private downloadService: Download) {
    /*
    this.files = [{filename: 'TestFile.txt', filepath: '/', isFolder: false, tags: ['testTag', 'testTag2', "aawdawdaw", "bawdawda", "boadawdawdawdawd"]} as FileListDTO, 
                  {filename: 'Bob.txt', filepath: '/', isFolder: false, tags: []} as FileListDTO,
                  {filename: 'BobFolder', filepath: '/', isFolder: true, tags: []} as FileListDTO]
  */
                  }

  ngOnInit(){
      this.loadFiles();
    }
  
    loadFiles(){
      this.files$ = this.downloadService.getFileList("files", this.currentPath);
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
}
