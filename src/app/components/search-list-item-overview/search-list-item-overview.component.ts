import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { IonRow, IonIcon } from '@ionic/angular/standalone';
import { TagPillComponent } from '../tag-pill/tag-pill.component';

@Component({
  selector: 'cmp-search-list-item-overview',
  templateUrl: './search-list-item-overview.component.html',
  styleUrls: ['./search-list-item-overview.component.scss'],
  imports: [IonRow, IonIcon, TagPillComponent]
})
export class SearchListItemOverviewComponent  implements OnInit {

  @Input('file-data') fileData: FileListDTO = { filename: '', filepath: '/', isFolder: false, tags: [] }
  @Output() hidePopup = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  callHidePopup() {
    this.hidePopup.emit();
  }

}
