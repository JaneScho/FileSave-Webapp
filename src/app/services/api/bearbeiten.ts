import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TagInputDTO } from '../interfaces/dtos';
import { api } from './api';
import { PathCorService } from '../dataCorrection/path-cor-service';

@Injectable({
  providedIn: 'root',
})
export class Bearbeiten {

  constructor(private http: HttpClient, 
    private pathCorService: PathCorService
  ){}

  updateTags(type: 'shared' | 'gallery' | 'files', filename: string, tags: TagInputDTO[], subPath?: string){
    const url = `${api.path}/bearbeiten/${type}/${encodeURIComponent(filename)}`;

    let params = new HttpParams();
    if(subPath){
      let cleanPath = this.pathCorService.cleanupPath(type, subPath);
      params = params.set('p', cleanPath);
    }
    return this.http.put(url, tags, {params});
  }

  deleteFile(type: 'shared' | 'gallery' | 'files', filename: string, subPath?: string){
    const url = `${api.path}/bearbeiten/${type}/${encodeURIComponent(filename)}`;

    let params = new HttpParams();
    if(subPath){
      let cleanPath = this.pathCorService.cleanupPath(type, subPath);
      params = params.set('p', cleanPath);
    }

    return this.http.delete(url,{params, responseType: 'text'});
  }
  
}
