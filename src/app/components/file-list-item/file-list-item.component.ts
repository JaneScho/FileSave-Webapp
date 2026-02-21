import { IonIcon } from '@ionic/angular/standalone';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { folderOpenOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'cmp-file-list-item',
  templateUrl: './file-list-item.component.html',
  styleUrls: ['./file-list-item.component.scss'],
  imports: [IonIcon],
  host: {
    class: ''
  }
})
export class FileListItemComponent  implements OnInit {
  @Input("file-data") fileData!: FileListDTO;
  @Output() itemClicked = new EventEmitter<FileListDTO>();

  constructor() {
    addIcons({folderOpenOutline})
   }

  ngOnInit() {}


  emitItemClicked(){
    this.itemClicked.emit(this.fileData);
  }
}
