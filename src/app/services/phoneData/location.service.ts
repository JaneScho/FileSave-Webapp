import { Injectable } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

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
        //zur Sicherheit Definition eines User-Agents
        headers: { 
          'User-Agent': 'FileSaveApp/1.0 (contact: chantal.westenberg@hs-osnabrueck.de)' 
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
