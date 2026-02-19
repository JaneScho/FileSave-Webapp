//Modul bearbeiten:
export interface TagCollectionDTO{
    items: TagDTO[]
}

export interface EditFileDataResponseDTO{
    filename: string,
    filepath: string,
    tags: TagDTO[]
}

export interface TagDTO{
    tag: string
}

export interface TagInputDTO{
    tagContent: string
}

//Modul download:
export interface FileListDTO{
    filename: string,
    filepath: string,
    isFolder: boolean,
    tags: string[]
}

export interface TagDownloadDTO{
    tagName: string
}

//Modul security:
export interface PrincipalDTO{
    username: string
}

export interface UserDTO{
    username: string
}

export interface UploadResponseDTO{
    filename: string,
    filepath: string,
    owner: string,
    tags: string[]
}