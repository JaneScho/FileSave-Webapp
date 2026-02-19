import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { api } from './api';

@Injectable({
  providedIn: 'root',
})
export class Upload {

  constructor(private http: HttpClient){}

  uploadFile(uploadType: 'shared' | 'gallery' | 'files', 
              file: File | Blob,
              filename: string,
              filetype: string,
              duplicateMethod: 'REPLACE' | 'ABORT' | 'APPEND_NUMBER',
              tags: string[],
              filepath?: string
  ){

    const url = `${api.path}/upload/${uploadType}`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('filetype', filetype);
    formData.append('duplicateMethod', duplicateMethod);
    tags.forEach(tag => formData.append('tags', tag));

    if(filepath){
      formData.append('filepath', filepath);
    }
     
    return this.http.post(url, formData);
  }
  
}
