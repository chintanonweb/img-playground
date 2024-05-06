import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BlobService } from '../service/blob.service';

@Component({
  selector: 'app-blob-playground',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './blob-playground.component.html',
  styleUrl: './blob-playground.component.css'
})
export class BlobPlaygroundComponent {
  blobs: any[] = [];
  listBlobsUrl = '/.netlify/functions/listBlobs';
  uploadBlobUrl = '/.netlify/functions/uploadBlob';
  name: string = '';

  constructor(
    private blobService: BlobService
  ) { }

  ngOnInit() {
    this.getBlobsList();
  }

  getBlobsList() {
    const res$ = this.blobService.blobList(this.listBlobsUrl)
    lastValueFrom(res$).then((item: any) => {
      this.blobs = item.blobs;
      console.log(this.blobs);
    }
    )
  }

  onSubmit() {
    const payload = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.name // Assuming this is the payload structure you want
      }),
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const res$ = this.blobService.uploadBlob(this.uploadBlobUrl, payload, { headers })
    lastValueFrom(res$)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
  }

  async onFileSelected(event: any) {
    const readFile = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    const file = await readFile(event.target.files[0]);
    const fileName = event.target.files[0].name.split('.').shift();
    console.log('fileName: ', fileName);
    const payload = {
      fileName: fileName,
      file: file,
    }
    const res$ = await this.blobService.uploadBlob(this.uploadBlobUrl, payload);
    lastValueFrom(res$)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
  }
}
