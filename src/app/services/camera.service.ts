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

    const formData = new FormData();

    const fileResponse = await fetch(image.webPath!);
    const fileBlob = await fileResponse.blob();

    const filename = `photo_${new Date().getTime()}_.${image.format}`;
    formData.append('file', fileBlob);
    formData.append('filename', filename);
    formData.append('fileType', image.format);
    //eigentlich ist duplicate hier egal

    return formData;
  }
  
}

/*@RestForm("duplicateMethod") DuplicateFileMethod duplicateFileMethod,
                                    @RestForm("tags") List<String> tagNames

*/

/*
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileUploadService {

  constructor(private http: HttpClient) {}

  uploadFile(description: string, fileBlob: File) {
    // 1. Create the FormData object
    const formData = new FormData();

    // 2. Append fields (these must match the @RestForm names in Java)
    formData.append('description', description);
    formData.append('file', fileBlob, fileBlob.name);

    // 3. POST the FormData
    // Note: Do NOT manually set 'Content-Type'. 
    // The browser will automatically set it to 'multipart/form-data' with a boundary.
    return this.http.post(`${api.path}/upload`, formData);
  }
}
*/
