export function cutPath(fullPath: string): string {
    const cutPattern = 'files/';
    var cutIndex = fullPath.indexOf(cutPattern);
    if (cutIndex < 0)
        return fullPath;
    return fullPath.substring(cutIndex + cutPattern.length - 1);
}

export function getUpPath(currentPath: string): string{
    const cutIndex = currentPath.lastIndexOf('/');
    if(cutIndex < 0)
      return currentPath;
    return currentPath.substring(0,cutIndex);
  }