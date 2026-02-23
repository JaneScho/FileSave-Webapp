import { Injectable } from '@angular/core';
import { Camera, CameraResultType} from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  public async takeNewPicture(){
    await window.customElements.whenDefined('pwa-camera-modal');
    
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 90,
      allowEditing: false
    });

    const formData = new FormData();

    const fileResponse = await fetch(image.webPath!);
    const fileBlob = await fileResponse.blob();

    const filename = `photo_${new Date().getTime()}_.${image.format}`;
    console.log("Filename: ", filename);
    formData.append('file', fileBlob);
    formData.append('filename', filename);
    formData.append('fileType', `.${image.format}`);

    return formData;
  }
  
}
