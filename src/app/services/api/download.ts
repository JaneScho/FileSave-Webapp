import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api } from './api';
import { FileListDTO } from '../interfaces/dtos';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { PathCorService } from '../dataCorrection/path-cor-service';

@Injectable({
  providedIn: 'root',
})
export class Download {

  constructor(private http: HttpClient, 
    private pathCorService: PathCorService
  ){}
  
  //Listen:
  getFileList(type: 'shared' | 'gallery' | 'files',
              subPath?: string ){
    const url = `${api.path}/download/list/${type}`;

    let params = new HttpParams();
    if(subPath){
      let cleanPath = this.pathCorService.cleanupPath(type, subPath);
      params = params.set('p', cleanPath);
    }

    return this.http.get<FileListDTO[]>(url,{params});
  }

  getFilesForTags(tags: string[]){
    const url = `${api.path}/download/list/tags`;

    let params = new HttpParams();
    tags.forEach(tag => {
      params = params.append('tags', tag);
    });

    return this.http.get<FileListDTO[]>(url,{params});
  }

  
  //Dateien:
  //Implemented based on: //https://coreui.io/answers/how-to-download-a-file-in-javascript/#:~:text=Create%20a%20blob%20URL%20and,to%20trigger%20file%20downloads%20programmatically.&text=This%20code%20creates%20a%20Blob,triggers%20the%20browser's%20download%20mechanism.
  downloadFile(type: 'shared' | 'gallery' | 'file',
              filename: string,
              subPath?: string){

    const url = `${api.path}/download/${type}/${filename}`;
    let params = new HttpParams();
    if(subPath){
        let cleanPath = this.pathCorService.cleanupPath(type, subPath);
        params = params.set('p', cleanPath);
    }
    return this.http.get(url, {params, responseType: 'blob'});
  }

  downloadAndSaveFile(type: 'shared' | 'gallery' | 'file',
                      filename: string,
                      subPath?: string){

    this.downloadFile(type, filename, subPath).subscribe(async (blob: Blob) => {

      if (Capacitor.getPlatform() === 'web') {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);  
      } else {
        const base64Data = await this.convertBlobToBase64(blob) as string;
        const rawData = base64Data.split(',')[1];

        await Filesystem.writeFile({
          path: filename,
          data: rawData,
          directory: Directory.Documents,
          recursive: true
        });
      }
    });
  }


  //Implemented based on: //https://www.geeksforgeeks.org/javascript/how-to-convert-blob-to-base64-encoding-using-javascript/
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
