import { FileListDTO } from './../services/interfaces/dtos';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonIcon, IonText } from '@ionic/angular/standalone';
import { FileListItemComponent } from '../components/file-list-item/file-list-item.component';
import { FilePopupComponent } from "../components/file-popup/file-popup.component";
import { Observable } from 'rxjs';
import { Download } from '../services/api/download';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/api/security/auth';
import { addIcons } from 'ionicons';
import { logOutOutline, reloadOutline } from 'ionicons/icons';
import { cutPath, getUpPath } from 'src/tools/tools';

@Component({
  selector: 'app-private',
  templateUrl: 'private.page.html',
  styleUrls: ['private.page.scss'],
  imports: [IonText, IonIcon, IonRow, AsyncPipe,
    IonHeader, IonToolbar, IonTitle, IonContent, FileListItemComponent, FilePopupComponent]
})
export class PrivatePage implements OnInit {
  @ViewChild('popup') popup !: FilePopupComponent;
  showPopup: Boolean = false;
  //files: FileListDTO[] = [];
  files$!: Observable<FileListDTO[]>;
  selectedFile !: FileListDTO;

  folderUpPossible: Boolean = false;
  currentPath: string = '';

  constructor(private cdr: ChangeDetectorRef, private downloadService: Download, public auth: AuthService, private router: Router) {
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
      //TODO Navigate to new folder
      this.currentPath = cutPath(fileData.filepath);
      console.log(this.currentPath);
      this.loadFiles();
    }
    else {
      //TODO show popup for file
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
}
