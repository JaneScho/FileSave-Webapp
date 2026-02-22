import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PathCorService {

  cleanupPath(type: 'shared' | 'files' | 'file' | 'gallery',
    subPath: string
  ){
    if(type == 'shared'){
      return this.cleanupSharedPath(subPath);
    } else if(type == 'file' || type == 'files'){
      return this.cleanupFilePath(subPath);
    } else {
      return subPath;
    }
  }
  
  private cleanupFilePath(subPath:string){
    let cleanPath = subPath;

      if (subPath.includes('/files/')) {
        cleanPath = subPath.split('/files/')[1];
      } else if (subPath.endsWith('/files')) {
        cleanPath = '/';
      }

      return cleanPath;
  }

  private cleanupSharedPath(subPath:string){
    let cleanPath = subPath.replace(/^(\/)?shared\/?/, '');

    return cleanPath;
  }
}
