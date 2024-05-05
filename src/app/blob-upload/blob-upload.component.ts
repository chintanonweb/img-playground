import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blob-upload',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blob-upload.component.html',
  styleUrl: './blob-upload.component.css'
})
export class BlobUploadComponent {
  uploadBlobUrl = '/.netlify/functions/uploadBlob';

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const metadata = { type: file.type };

    this.uploadBlob(file, metadata);
  }

  uploadBlob(file: File, metadata: any) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    this.http.post(this.uploadBlobUrl, formData)
      .subscribe({
        next: (response) => {
          console.log('Blob uploaded successfully!');
        }, error: (error) => {
          console.error('Error uploading blob:', error);
        }
      });
  }
}
