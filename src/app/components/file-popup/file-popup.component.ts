import { asNativeElements, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { TagInputLabelComponent } from "../tag-input-label/tag-input-label.component";
import { SearchingTextInputComponent } from "../searching-text-input/searching-text-input.component";
import { IonRow, IonLabel, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { addCircleOutline, addOutline, closeOutline, downloadOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'page-file-popup',
  templateUrl: './file-popup.component.html',
  styleUrls: ['./file-popup.component.scss'],
  imports: [IonIcon, IonLabel, IonRow, TagInputLabelComponent, SearchingTextInputComponent, IonButton],
  host: {
    class: 'popup-container ion-display-flex'
  }
})
export class FilePopupComponent implements OnInit {
  @Input('file-data') fileData: FileListDTO = { filename: '', filepath: '/', isFolder: false, tags: [] }
  private oldTags: string[] = [];

  @Output() hidePopup = new EventEmitter();
  tagOptions: string[] = ['Testtags', 'Muss geladen werden'];
  selectedAddTag: string = "";

  constructor(private cdr: ChangeDetectorRef) {
    addIcons({ addCircleOutline, downloadOutline, trashOutline, closeOutline });
  }

  ngOnInit() {
    //TODO Retrieve possible tags for tagOptions
    this.oldTags = this.oldTags.concat(this.fileData.tags);
  }

  removeTag(tagIndex: number) {
    if (tagIndex > -1) {
      this.fileData.tags.splice(tagIndex, 1);
    }
    this.cdr.detectChanges();
  }

  addTag(tag: string) {
    tag = tag.trim();
    console.log("Adding Tag: " + tag);
    if (tag.length > 0) {
      this.fileData.tags.push(tag);
      this.cdr.detectChanges();
    }
  }

  callHidePopup() {
    this.fileData.tags = this.oldTags
    this.oldTags = [];
    this.cdr.detectChanges()
    this.hidePopup.emit();
  }
}
