import { Injectable } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  constructor( private http:HttpClient){}

  public async getLocationName(){
    const coordinates = await Geolocation.getCurrentPosition();
    
    const url = "https://nominatim.openstreetmap.org/reverse?format=json&lat="
                  + coordinates.coords.latitude 
                  + "&lon=" + coordinates.coords.longitude;

    const data: any = await firstValueFrom(this.http.get(url));

    return data.address.city || data.address.town || data.address.village || 'Unknown';
  }
  
}
