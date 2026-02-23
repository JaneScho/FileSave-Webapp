import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonRow, IonCol, IonGrid, IonFab, IonFabButton, IonHeader, IonToolbar, 
        IonTitle, IonContent, IonIcon, IonFabList } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';

import { Download } from '../services/api/download';
import { Observable } from 'rxjs';
import { FileListDTO } from '../services/interfaces/dtos';
import { FilePopupComponent } from "../components/file-popup/file-popup.component";
import { GalleryImageComponent } from "../components/gallery-image/gallery-image.component";
import { addIcons } from 'ionicons';
import { logOutOutline, reloadOutline } from 'ionicons/icons';
import { AuthService } from '../services/api/security/auth';
import { Router, RouterLink } from '@angular/router';
import { LocationService } from '../services/phoneData/location.service';
import { CameraService } from '../services/phoneData/camera.service';
import { Upload } from '../services/api/uploadService';

@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss'],
  imports: [IonFabList, FormsModule, IonCol, IonRow, IonGrid, IonHeader, 
            IonToolbar, IonTitle, IonContent, IonIcon, FilePopupComponent, 
            RouterLink, GalleryImageComponent, IonFab, IonFabButton],
})
export class GalleryPage implements OnInit {

  files$!: Observable<FileListDTO[]>;
  @ViewChild(IonModal) modal!: IonModal;

  showPopup: Boolean = false;
  files: FileListDTO[] = [];
  selectedFile !: FileListDTO;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  constructor(public downloadService: Download, private cdr: ChangeDetectorRef, public auth: AuthService, private router: Router,
    public cameraService: CameraService, public locationService: LocationService, public uploadService: Upload) { 
    addIcons({reloadOutline, logOutOutline});
  }

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.files = [];
    this.cdr.detectChanges();
    this.downloadService.getFileList("gallery").subscribe({
      next: data =>{
        this.files = data;
        console.log(this.files);
        this.cdr.detectChanges();
      }
    });
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

  callShowPopup(file: FileListDTO){
    this.showPopup = true;
    this.selectedFile = file;
    this.cdr.detectChanges();
  }

  hidePopup(){
    this.showPopup = false;
    this.cdr.detectChanges();
  }


  async takeNewPhoto(){

    try {
      const location = await this.locationService.getLocationName();

      const formData = await this.cameraService.takeNewPicture();

      const tags: string[] = [location];

      this.uploadService.uploadFile(
        "gallery",
        formData.get('file') as Blob,
        formData.get('filename') as string,
        formData.get('fileType') as string,
        'APPEND_NUMBER',
        tags
      ).subscribe({
        next: (res) => console.log('Upload Success:', res),
        error: (err) => console.error('Upload Error:', err)
      });

    } catch (err) {
      console.error('Process failed:', err);
    }
  }
}
