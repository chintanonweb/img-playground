import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'https://pixabay.com/api/';
  private apiKey = 'apikey';

  constructor(private http: HttpClient) {}

  getRandomImages(): Observable<any[]> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=random&image_type=photo&pretty=true`;
    return this.http.get<any[]>(url);
  }
}
