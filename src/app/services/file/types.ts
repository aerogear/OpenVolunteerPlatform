
export interface FileEntry {
    id: string;
    filename: string;
    mimetype: string;
    encoding: string;
    url: string;
}

export interface FileEntries {
    uploads: [FileEntry];
}

