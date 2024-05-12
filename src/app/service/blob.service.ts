import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlobService {
  apiKey = 'b75c1550c91c4a078978505f9eacaa61'; // Replace with your News API key
  baseUrl = 'https://newsapi.org/v2/top-headlines';
  constructor(private http: HttpClient) { }

  uploadBlob(url: string, body: any, options?: { headers?: HttpHeaders }) {
    return this.http.post(url, body, options);
  }

  blobList(url: string) {
    return this.http.get(url);
  }

  getNews(url: string, category?: string) {
    let queryParams = '';
    if (category) {
      queryParams = `?category=${category}`;
    }
    return this.http.get(`${url}${queryParams}`);
    // return this.http.get(url);
  }

  getHeadlines(country: string = 'in', category: string = 'technology'): Observable<any> {
    let params: any = {
      apiKey: this.apiKey
    };
    if (country) {
      params['country'] = country;
    }
    if (category) {
      params['category'] = category;
    }

    return this.http.get(this.baseUrl, { params });
  }
}
