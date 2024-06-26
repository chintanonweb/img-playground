import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { BlobService } from '../service/blob.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blob-playground',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './blob-playground.component.html',
  styleUrl: './blob-playground.component.css'
})
export class BlobPlaygroundComponent {
  blobs: any[] = [];
  listBlobsUrl = '/.netlify/functions/listBlobs';
  uploadBlobUrl = '/.netlify/functions/uploadBlob';
  name: string = '';
  loading: boolean = false;
  @ViewChild('fileInput') fileInputRef!: ElementRef;
  errorMessage: string = '';
  showSuccessMsg: string = '';
  showErrorMsg: string = '';

  constructor(
    private blobService: BlobService
  ) { }

  ngOnInit() {
    this.getBlobsList();
  }

  getBlobsList() {
    this.loading = true; // Set loading to true when fetching blobs
    const res$ = this.blobService.blobList(this.listBlobsUrl)
    lastValueFrom(res$).then((item: any) => {
      this.blobs = item;
      this.loading = false; // Set loading to false after blobs are fetched
    }
    ).catch(() => {
      this.loading = false; // Set loading to false if there's an error
    });
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
    this.errorMessage = '';

    const maxFileSize = 100 * 1024; // 100KB in bytes
    const fileData = event.target.files[0];
    const fileSize = fileData?.size;
    if (fileSize > maxFileSize) {
      this.errorMessage = "File size exceeds the limit of 100KB";
      this.fileInputRef.nativeElement.value = ''; // Clear the file input
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return; // Exit the function without proceeding further
    }
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
    const file = await readFile(fileData);
    const fileName = event.target.files[0].name.split('.').shift();
    const name = fileData?.name;
    const type = fileData?.type ? fileData?.type : 'NA';
    const lastModified = fileData?.lastModified;
    const metaData = {
      name: name,
      type: type,
      size: this.bytesToSize(fileSize),
      lastModified: new Date(lastModified)
    }

    const payload = {
      fileName: fileName,
      file: file,
      metaData: metaData
    }
    const res$ = await this.blobService.uploadBlob(this.uploadBlobUrl, payload);
    lastValueFrom(res$)
      .then((response: any) => {
        console.log(response);
        if (response) {
          this.showSuccessMsg = response;
          setTimeout(() => {
            this.showSuccessMsg = '';
          }, 3000);
        }
        this.getBlobsList();
      })
      .catch((error) => {
        console.log(error);
        this.showErrorMsg = error;
        setTimeout(() => {
          this.showErrorMsg = '';
        }, 3000);
      })
  }
  isImageData(data: any): boolean {
    console.log(data?.data?.img?.startsWith('data:image'));
    return data?.data?.img?.startsWith('data:image') || false; // Optional chaining for safety
  }

  bytesToSize(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes: string[] = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Ensure we don't exceed the defined sizes array
    const fixedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(Math.min(decimals, i)));
    return `${fixedValue.toLocaleString()} ${sizes[i]}`;
  }

}
