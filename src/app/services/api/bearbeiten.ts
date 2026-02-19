import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TagInputDTO } from '../interfaces/dtos';
import { api } from './api';

@Injectable({
  providedIn: 'root',
})
export class Bearbeiten {

  constructor(private http: HttpClient){}

  updateTags(type: 'shared' | 'gallery' | 'files', filename: string, tags: TagInputDTO[], subPath?: string){
    const url = `${api.path}/bearbeiten/${type}/${encodeURIComponent(filename)}`;

    //encodedURIComponent als schutz for Spezialzeichen

    let params = new HttpParams();
    if(subPath){
      params = params.set('p', subPath);
    }

    return this.http.put(url, tags, {params});
  }

  deleteFile(type: 'shared' | 'gallery' | 'files', filename: string, subPath?: string){
    const url = `${api.path}/bearbeiten/${type}/${encodeURIComponent(filename)}`;

    let params = new HttpParams();
    if(subPath){
      params = params.set('p', subPath);
    }


    return this.http.delete(url,);
  }
  
}
