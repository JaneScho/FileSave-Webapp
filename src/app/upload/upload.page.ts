import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonChip, IonSearchbar, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { Upload } from '../services/api/uploadService';
import { Tags } from '../services/api/tags';
import { Observable, Subject, debounceTime, switchMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TagCollectionDTO} from '../services/interfaces/dtos';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.page.html',
  styleUrls: ['upload.page.scss'],
  imports: [ FormsModule, AsyncPipe,
    IonList, IonItem, IonChip, IonSearchbar, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class UploadPage {
  selectedFile: File | null = null;
  fileName: string = '';
  uploadType: 'gallery' | 'shared' | 'files' = 'gallery';
  path: string = '';
  tags: string[] = [];
  newTag: string = '';

  searchQuery$ = new Subject<string>(); //Observer und Observable -> im Text erwaehnen
 suggestedTags$: Observable<string[]>;

  constructor(private uploadService: Upload, private tagService: Tags) {
    this.suggestedTags$ = this.searchQuery$.pipe(
      debounceTime(300), //entlastung der API
      switchMap(query => { //basically cancel -> A wird getipt, waehrend call startet, aber dann wird doch b getippt
        if (!query.trim()) return of([]); 
        
        return this.tagService.searchTags(query).pipe(
          map((collection: TagCollectionDTO) => 
            collection?.items?.map(item => item.tag)
          )
        );
      })
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  onSearchInput(event: any) {
    const value = event.target.value;
    this.searchQuery$.next(value);
  }

  addTag() {
    const tagToAdd = this.newTag.trim();
    if (tagToAdd && !this.tags.includes(tagToAdd)) {
      this.tags.push(tagToAdd);
      this.newTag = '';
      this.searchQuery$.next('');
    }
  }

  selectTag(tag: string) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    
    this.newTag = ''; 
    this.searchQuery$.next(''); 
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  submitUpload(){

    if (!this.selectedFile) {
      console.error("No file selected!");
      return;
    }

    try{
      this.uploadService.uploadFile(
        this.uploadType,
        this.selectedFile,
        this.fileName,
        this.selectedFile?.type,
        'APPEND_NUMBER',
        this.tags,
        this.path
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
