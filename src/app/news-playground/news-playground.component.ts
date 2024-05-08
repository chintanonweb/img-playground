import { Component, OnInit } from '@angular/core';
import { BlobService } from '../service/blob.service';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-playground',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './news-playground.component.html',
  styleUrl: './news-playground.component.css'
})
export class NewsPlaygroundComponent implements OnInit {
  getNewsUrl = '/.netlify/functions/getNews';
  loading: boolean = false;
  articles: any[] = [];
  country: string = '';
  category: string = '';

  constructor(
    private blobService: BlobService
  ) { }

  ngOnInit(): void {
    this.getNews();
    // this.getHeadlines();
  }

  getNews() {
    this.loading = true;
    const res$ = this.blobService.getNews(this.getNewsUrl)
    lastValueFrom(res$).then((item: any) => {
      this.articles = item;
      this.loading = false; // Set loading to false after blobs are fetched
    }
    ).catch(() => {
      this.loading = false; // Set loading to false if there's an error
    });
  }

  getHeadlines(country?: string, category?: string): void {
    this.blobService.getHeadlines(country, category)
      .subscribe(response => {
        console.log(response);

        this.articles = response.articles;
      });
  }
}
