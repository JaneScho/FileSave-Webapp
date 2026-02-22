import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { IonRow, IonIcon } from '@ionic/angular/standalone';
import { TagPillComponent } from '../tag-pill/tag-pill.component';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'cmp-search-list-item-overview',
  templateUrl: './search-list-item-overview.component.html',
  styleUrls: ['./search-list-item-overview.component.scss'],
  imports: [IonRow, IonIcon, TagPillComponent],
  host: {
    class: 'popup-container ion-display-flex'
  }
})
export class SearchListItemOverviewComponent  implements OnInit {

  @Input('file-data') fileData: FileListDTO = { filename: '', filepath: '/', isFolder: false, tags: [] }
  @Output() hidePopup = new EventEmitter();

  constructor() {
    addIcons({closeOutline})
   }

  ngOnInit() {}

  callHidePopup() {
    this.hidePopup.emit();
  }

}
