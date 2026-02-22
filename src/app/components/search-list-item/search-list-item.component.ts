import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';

import { IonRow, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'cmp-search-list-item',
  templateUrl: './search-list-item.component.html',
  styleUrls: ['./search-list-item.component.scss'],
  imports: [IonRow, IonIcon]
})
export class SearchListItemComponent  implements OnInit {
  @Input('file-data') fileData!: FileListDTO;
  @Output('itemClicked') itemClicked = new EventEmitter<FileListDTO>();
  constructor() { }

  ngOnInit() {}

  emitItemClicked(){
    this.itemClicked.emit(this.fileData);
  }
}
