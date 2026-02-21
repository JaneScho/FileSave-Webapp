import { asNativeElements, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { TagInputLabelComponent } from "../tag-input-label/tag-input-label.component";

@Component({
  selector: 'page-file-popup',
  templateUrl: './file-popup.component.html',
  styleUrls: ['./file-popup.component.scss'],
  imports: [TagInputLabelComponent],
  host:{
    class: 'w-100 popup display-flex'
  }
})
export class FilePopupComponent  implements OnInit {
  @Input('file-data') fileData: FileListDTO = {filename: '', filepath:'/', isFolder: false, tags:[]}

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {}

  removeTag(tagIndex: Number){

  }
}
