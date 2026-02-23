import { FileListDTO } from './../services/interfaces/dtos';
import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonIcon, IonFab, IonFabButton, IonFabList } from '@ionic/angular/standalone';
import { FileListItemComponent } from '../components/file-list-item/file-list-item.component';
import { FilePopupComponent } from "../components/file-popup/file-popup.component";
import { Observable } from 'rxjs';
import { Download } from '../services/api/download';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/api/security/auth';
import { addIcons } from 'ionicons';
import { logOutOutline, reloadOutline } from 'ionicons/icons';
import { cutPath, getUpPath } from 'src/tools/tools';
import { CameraService } from '../services/phoneData/camera.service';
import { LocationService } from '../services/phoneData/location.service';
import { Upload } from '../services/api/uploadService';

@Component({
  selector: 'app-private',
  templateUrl: 'private.page.html',
  styleUrls: ['private.page.scss'],
  imports: [IonFabList, IonFabButton, IonFab, IonIcon, IonRow, AsyncPipe,
    IonHeader, IonToolbar, IonTitle, IonContent, FileListItemComponent, FilePopupComponent, RouterLink]
})
export class PrivatePage implements OnInit {
  @ViewChild('popup') popup !: FilePopupComponent;
  showPopup: Boolean = false;
  files$!: Observable<FileListDTO[]>;
  selectedFile !: FileListDTO;

  folderUpPossible: Boolean = false;
  currentPath: string = '';

  constructor(private cdr: ChangeDetectorRef, private downloadService: Download, public auth: AuthService, private router: Router,
    public cameraService: CameraService, public locationService: LocationService, public uploadService: Upload) {
    addIcons({ reloadOutline, logOutOutline });
  }

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.files$ = this.downloadService.getFileList("files", this.currentPath);
    const cutPattern = 'files/';
    this.folderUpPossible = this.currentPath.length > 1;
    this.cdr.detectChanges();
  }


  listItemSelected(fileData: FileListDTO) {
    if (fileData.isFolder) {
      this.currentPath = cutPath(fileData.filepath);
      console.log(this.currentPath);
      this.loadFiles();
    } else {
      this.showPopup = true;
      this.selectedFile = fileData;
      this.cdr.detectChanges();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  hidePopup() {
    this.showPopup = false;
    this.cdr.detectChanges();
  }

  getUpPath(): string {
    return getUpPath(this.currentPath);
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
