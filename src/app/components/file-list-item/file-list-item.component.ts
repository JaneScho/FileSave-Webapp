import { IonIcon } from '@ionic/angular/standalone';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { documentOutline, folderOpenOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'cmp-file-list-item',
  templateUrl: './file-list-item.component.html',
  styleUrls: ['./file-list-item.component.scss'],
  imports: [IonIcon],
})
export class FileListItemComponent  implements OnInit {
  @Input('file-data') fileData!: FileListDTO;
  @Output('itemClicked') itemClicked = new EventEmitter<FileListDTO>();

  constructor() {
    addIcons({folderOpenOutline, documentOutline})
   }

  ngOnInit() {}


  emitItemClicked(){
    this.itemClicked.emit(this.fileData);
  }
}
