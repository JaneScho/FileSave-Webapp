import { Injectable } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';

//import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  //constructor( private http:HttpClient){}

  public async getLocationName(): Promise<string>{

    try{
      const coordinates = await Geolocation.getCurrentPosition();
      const options = {
        url: 'https://api.bigdatacloud.net/data/reverse-geocode-client',
        params: {
          format: 'json',
          latitude: coordinates.coords.latitude.toString(),
          longitude: coordinates.coords.longitude.toString()
        },
        headers: { 
          // Identifies your app to OSM to avoid 403/425 errors
          'User-Agent': 'MyIonicPhotoApp/1.0 (contact: your-email@example.com)' 
        }
      };

      const response: HttpResponse = await CapacitorHttp.get(options);

      const data = response.data;
       return data.city || data.locality || 'Unknown';
    } catch (error){
      console.error('Location error:', error);
      return 'Location Unavailable';
    }  
  }
}
