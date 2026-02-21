import { asNativeElements, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { TagInputLabelComponent } from "../tag-input-label/tag-input-label.component";
import { SearchingTextInputComponent } from "../searching-text-input/searching-text-input.component";

@Component({
  selector: 'page-file-popup',
  templateUrl: './file-popup.component.html',
  styleUrls: ['./file-popup.component.scss'],
  imports: [TagInputLabelComponent, SearchingTextInputComponent],
  host:{
    class: 'w-100 popup display-flex'
  }
})
export class FilePopupComponent  implements OnInit {
  @Input('file-data') fileData: FileListDTO = {filename: '', filepath:'/', isFolder: false, tags:[]}
  tagOptions: String[] = ['Testtags', 'Muss geladen werden'];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    //TODO Retrieve possible tags for tagOptions
  }

  removeTag(tagIndex: Number){

  }
}
