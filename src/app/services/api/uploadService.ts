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
    const nameWithoutExtension = filename.substring(0, filename.lastIndexOf('.'));
    formData.append('filename', nameWithoutExtension);

    //Umformatieren des filetypes:
    let fileExtension = filetype;
    if(filetype.includes('/')){
      fileExtension = '.' + filetype.split('/')[1];
    }

    formData.append('filetype', fileExtension);
    formData.append('duplicateMethod', duplicateMethod);
    tags.forEach(tag => formData.append('tags', tag));

    if(filepath){
      formData.append('filepath', filepath);
    }
     
    console.log("--- FormData Content ---");
  formData.forEach((value, key) => {
    if (value instanceof File) {
      console.log(`${key}: [File] ${value.name} (${value.size} bytes)`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });


    return this.http.post(url, formData);
  }
  
}
