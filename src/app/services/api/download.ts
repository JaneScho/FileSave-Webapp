import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { api } from './api';
import { FileListDTO } from '../interfaces/dtos';

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
  downloadFile(type: 'shared' | 'gallery' | 'files',
              filename: string,
              subPath?: string){
    const url = `${api.path}/download/${type}/${filename}`;

    let params = new HttpParams();
    if(subPath){
      params = params.set('p', subPath);
    }

    return this.http.get(url, {params});
  }
}
