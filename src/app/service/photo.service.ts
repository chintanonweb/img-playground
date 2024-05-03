import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'https://api.unsplash.com/photos';
  private apiKey = 'oPXncVGsmIqZ6j6ue8K0O0GmSTpYfTOXMjkY1Nn4_cY';

  constructor(private http: HttpClient) { }

  getRandomImages(): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        client_id: this.apiKey,
        per_page: 10 // adjust the number of images to fetch
      }
    });
  }
}
