import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TagCollectionDTO, TagInputDTO } from '../interfaces/dtos';
import { api } from './api';

@Injectable({
  providedIn: 'root',
})
export class Tags {

  private LIMIT = 10; //set limit for search and all
  
  constructor(private http: HttpClient){}

  searchTags(search: string){
    const url = `${api.path}/tags/search`;

    let params = new HttpParams();
    if(search){
      params = params.set('search', search);
    }
    params = params.set('limit', this.LIMIT);

    return this.http.get<TagCollectionDTO>(url, {params});
  }
}
