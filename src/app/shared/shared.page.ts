import { ChangeDetectorRef, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonIcon, IonFab, IonFabButton, IonFabList } from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { FileListItemComponent } from "../components/file-list-item/file-list-item.component";
import { FilePopupComponent } from "../components/file-popup/file-popup.component";
import { FileListDTO } from '../services/interfaces/dtos';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/api/security/auth';
import { Observable } from 'rxjs';
import { Download } from '../services/api/download';
import { cutPath, getUpPath } from 'src/tools/tools';
import { CameraService } from '../services/phoneData/camera.service';
import { LocationService } from '../services/phoneData/location.service';
import { Upload } from '../services/api/uploadService';

@Component({
  selector: 'app-shared',
  templateUrl: 'shared.page.html',
  styleUrls: ['shared.page.scss'],
  imports: [IonFabList, IonFabButton, IonFab, IonIcon, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, FileListItemComponent, RouterLink, FilePopupComponent, AsyncPipe],
})
export class SharedPage {
  showPopup: Boolean = false;
  files$!: Observable<FileListDTO[]>;
  selectedFile !: FileListDTO; 
  folderUpPossible: Boolean = false;
  currentPath: string = '';

  constructor(private downloadService: Download, private cdr: ChangeDetectorRef, public auth: AuthService, private router: Router,
    public cameraService: CameraService, public locationService: LocationService, public uploadService: Upload) {
  }

  ngOnInit(){
    this.loadFiles();
  }

  loadFiles(){
    this.files$ = this.downloadService.getFileList("shared", this.currentPath);
    this.folderUpPossible = this.currentPath.length > 1;
    this.cdr.detectChanges();
  }

  listItemSelected(fileData: FileListDTO){
    if (fileData.isFolder) {
      this.currentPath = cutPath(fileData.filepath);
      console.log(this.currentPath);
      this.loadFiles();
    }
    else {
      this.showPopup = true;
      this.selectedFile = fileData;
      this.cdr.detectChanges();
    }
  }

  hidePopup(){
    this.showPopup = false;
    this.cdr.detectChanges();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getUpPath(): string{
    return getUpPath(this.currentPath);
  }


  async takeNewPhoto(){

    try {
    const location = await this.locationService.getLocationName();
    console.log('Current location:', location);

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
