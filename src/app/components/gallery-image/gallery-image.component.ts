import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IonImg, IonSpinner, IonRow } from "@ionic/angular/standalone";
import { FileListDTO } from 'src/app/services/interfaces/dtos';
import { api } from 'src/app/services/api/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cmp-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
  imports: [IonRow, IonSpinner, IonImg],
})
export class GalleryImageComponent implements OnInit {
  @Input('fileData') fileData !: FileListDTO;
  
  imageSrc!: string;
  isLoading: Boolean = true;
  api = api.path + '/download/gallery/'


  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit() {
    const url = api.path + '/download/gallery/' + this.fileData.filename;

    this.http.get(url, { responseType: 'blob' })
      .subscribe(blob => {
        this.imageSrc = URL.createObjectURL(blob);
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  imageLoaded() {
    this.isLoading = false;
    console.log("Done loading");
    this.cdr.detectChanges();
  }

  imageLoadErr() {
    this.isLoading = false;
    console.error("Konnte Bild nicht laden");
    this.cdr.detectChanges();
  }
}
