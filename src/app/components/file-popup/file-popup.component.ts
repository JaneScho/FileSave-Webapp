import { asNativeElements, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileListDTO, TagCollectionDTO, TagInputDTO } from 'src/app/services/interfaces/dtos';
import { TagInputLabelComponent } from "../tag-input-label/tag-input-label.component";
import { SearchingTextInputComponent } from "../searching-text-input/searching-text-input.component";
import { IonRow, IonLabel, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { addCircleOutline, addOutline, closeOutline, downloadOutline, trashOutline } from 'ionicons/icons';
import { Download } from 'src/app/services/api/download';
import { Bearbeiten } from 'src/app/services/api/bearbeiten';
import { catchError, debounceTime, distinctUntilChanged, map, of, Subject, switchMap } from 'rxjs';
import { Tags } from 'src/app/services/api/tags';

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
  @Input('download-type') downloadType: 'shared' | 'gallery' | 'file' = 'file';
  @Input('edit-type') editType: 'shared' | 'gallery' | 'files' = 'files';
  @Input('file-data') fileData: FileListDTO = { filename: '', filepath: '/', isFolder: false, tags: [] }
  @Output() hidePopup = new EventEmitter();
  tagOptions: string[] = [];
  selectedAddTag: string = "";

  searchQuery$ = new Subject<string>();

  constructor(private cdr: ChangeDetectorRef, 
              private downloadService:Download,
              private editService: Bearbeiten,
            private tagService: Tags) {
    addIcons({ addCircleOutline, downloadOutline, trashOutline, closeOutline });
  }

  ngOnInit() {
    this.searchQuery$.pipe(
    debounceTime(300),
    switchMap(query => {
      if (!query.trim()) return of([]);
      return this.tagService.searchTags(query).pipe(
        map((collection: TagCollectionDTO) => 
          collection?.items?.map(item => item.tag) || []
        ),
        catchError(err => {
          console.error('Tag search failed:', err);
          return of([]); 
        })
      );
    })
  ).subscribe(suggestions => {
    this.tagOptions = suggestions; 
    this.cdr.detectChanges();
  });
  }

  onInputChange(value: string) {
    this.selectedAddTag = value;

    this.searchQuery$.next(value);
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
    this.hidePopup.emit();
  }

  downloadFile(){
                  console.log("attempting download");
    this.downloadService.downloadAndSaveFile(this.downloadType, 
      this.fileData.filename,
      this.fileData.filepath);
  }

  editFile(){
    console.log("attempting edit");
    const tagsToSend: TagInputDTO[] = this.fileData.tags.map(tag => ({
      tagContent: tag
    }));

    try{
      this.editService.updateTags(this.editType,
                                  this.fileData.filename,
                                  tagsToSend,
                                  this.fileData.filepath
     ).subscribe({
        next: (res) => {
          console.log('Upload Success:', res)
          //Toast
          // Reset form
          },
        error: (err) => console.error('Upload Error:', err)
      });
    } catch (err) {
      console.error('Process failed:', err);
    }
    
  }

  deleteFile(){
    console.log("attempting delete");
    try{
      this.editService.deleteFile(this.editType,
      this.fileData.filename,
      this.fileData.filepath
    ).subscribe({
        next: (res) => {
          console.log('Upload Success:', res)
          //Toast
          // Reset form
          },
        error: (err) => console.error('Upload Error:', err)
      });
    } catch (err) {
      console.error('Process failed:', err);
    }  
    
  }
}
