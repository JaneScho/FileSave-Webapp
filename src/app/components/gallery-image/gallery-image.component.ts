import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IonImg, IonSpinner } from "@ionic/angular/standalone";
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { api } from 'src/app/services/api/api';

@Component({
  selector: 'cmp-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
  imports: [IonSpinner, IonImg],
})
export class GalleryImageComponent  implements OnInit {
  @Input('fileData') fileData !: FileListDTO;
  isLoading :Boolean = true;
  api = api.path + '/download/gallery/'
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {}

  imageLoaded(){
    this.isLoading = false;
    console.log("Done loading");
    this.cdr.detectChanges();
  }

  imageLoadErr(){
    this.isLoading = false;
    console.error("Konnte Bild nicht laden");
    this.cdr.detectChanges();
  }
}
