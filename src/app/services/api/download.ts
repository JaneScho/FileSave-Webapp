import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api } from './api';
import { FileListDTO } from '../interfaces/dtos';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class Download {

  constructor(private http: HttpClient){}
  
  //Listen:
  getFileList(type: 'shared' | 'gallery' | 'files',
              subPath?: string
    ){
    const url = `${api.path}/download/list/${type}`;

    let params = new HttpParams();
    if(subPath){
      params = params.set('p', subPath);
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
  downloadFile(type: 'shared' | 'gallery' | 'file',
              filename: string,
              subPath?: string){
    

    const url = `${api.path}/download/${type}/${filename}`;

    
   let params = new HttpParams();
    if(subPath){
      let cleanPath = subPath;

      if (subPath.includes('/files/')) {
        cleanPath = subPath.split('/files/')[1];
      } else if (subPath.endsWith('/files')) {
        cleanPath = '/';
      }
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
        link.download = filename; // This triggers the browser download dialog
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log('Web download triggered');
        
      } else {
        const base64Data = await this.convertBlobToBase64(blob) as string;
        const rawData = base64Data.split(',')[1];

        await Filesystem.writeFile({
          path: filename,
          data: rawData,
          directory: Directory.Documents,
          recursive: true
        });
        console.log('Mobile file saved');
      }
      /*
      const base64Data = await this.convertBlobToBase64(blob) as string;

      try {
        await Filesystem.writeFile({
          path: filename,           // The name of the file on the phone
          data: base64Data,         // The Base64 string
          directory: Directory.Documents, // Saves to the user's Documents folder
          recursive: true           // Creates folders if they don't exist
        });
        console.log('Image saved successfully!');
      } catch (e) {
        console.error('Error saving file', e);
      }
        */
    });
  }

  //not sure
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
