import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  constructor(private http: HttpClient) { }

  uploadBlob(url: string, body: any, options?: { headers?: HttpHeaders }) {
    return this.http.post(url, body, options);
  }

  blobList(url: string) {
    return this.http.get(url);
  }
}
