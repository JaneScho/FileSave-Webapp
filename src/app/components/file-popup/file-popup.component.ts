import { asNativeElements, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { TagInputLabelComponent } from "../tag-input-label/tag-input-label.component";
import { SearchingTextInputComponent } from "../searching-text-input/searching-text-input.component";
import {IonIcon, IonButton} from '@ionic/angular/standalone';

import { downloadOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { Download } from 'src/app/services/api/download';

@Component({
  selector: 'page-file-popup',
  templateUrl: './file-popup.component.html',
  styleUrls: ['./file-popup.component.scss'],
  imports: [TagInputLabelComponent, SearchingTextInputComponent,
    IonIcon, IonButton
  ],
  host:{
    class: 'w-100 popup display-flex'
  }
})
export class FilePopupComponent  implements OnInit {
  @Input('download-type') downloadType: 'shared' | 'gallery' | 'file' = 'file';
  @Input('file-data') fileData: FileListDTO = {filename: '', filepath:'/', isFolder: false, tags:[]}
  tagOptions: String[] = ['Testtags', 'Muss geladen werden'];

  constructor(private cdr: ChangeDetectorRef, private downloadService:Download) { 
    addIcons({downloadOutline})
  }

  ngOnInit() {
    //TODO Retrieve possible tags for tagOptions
  }

  removeTag(tagIndex: Number){

  }

  downloadFile( filename: string,
                subPath?: string){
    this.downloadService.downloadAndSaveFile(this.downloadType, filename, subPath);
  }
}
