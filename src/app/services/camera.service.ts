import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  public async takeNewPicture(){
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 90,
      allowEditing: false
    });
  }
  
  //const response = await fetch(cameraPhoto.webPath!);
  //`picture.${cameraPhoto.format}`
  //const fileName = `upload_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}.${cameraPhoto.format}`;
  
}
