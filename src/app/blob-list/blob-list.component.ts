import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
interface BlobInfo {
  id: string;
  filename: string;
  size: number;
  metadata: any;
}
@Component({
  selector: 'app-blob-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blob-list.component.html',
  styleUrl: './blob-list.component.css'
})
export class BlobListComponent {
  blobs: BlobInfo[] = [];
  listBlobsUrl = '/.netlify/functions/listBlobs';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getBlobsList();
  }

  getBlobsList() {
    this.http.get<BlobInfo[]>(this.listBlobsUrl)
      .subscribe(blobs => this.blobs = blobs);
  }
}
