import { Component } from '@angular/core';
import { IkUploadWrapperModule } from '../ik-upload.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-img-generator',
  standalone: true,
  imports: [FormsModule, RouterModule, IkUploadWrapperModule],
  templateUrl: './img-generator.component.html',
  styleUrl: './img-generator.component.css'
})
export class ImgGeneratorComponent {
  loading: boolean = false;
  imageUrl!: string;
  defaultImgUrl!: string;
  authUrl = '/.netlify/functions/auth';
  platformOptions = [
    { value: 'instagramProfile', label: 'Instagram Profile (320x320)' },
    { value: 'instagramLandscape', label: 'Instagram Landscape (1080x566)' },
    { value: 'instagramPostSquare', label: 'Instagram Post (Square) (1080x1080)' },
    { value: 'instagramStory', label: 'Instagram Story (1080x1920)' },
    { value: 'facebookProfile', label: 'Facebook Profile (196x196)' },
    { value: 'facebookPostLandscape', label: 'Facebook Post (Landscape) (1200x628)' },
    { value: 'facebookPostSquare', label: 'Facebook Post (Square) (1080x1080)' },
    { value: 'facebookCover', label: 'Facebook Cover (823x315)' },
    { value: 'linkedinProfile', label: 'LinkedIn Profile (400x400)' },
    { value: 'linkedinPostLandscape', label: 'LinkedIn Post (Landscape) (757x402)' },
    { value: 'linkedinPostSquare', label: 'LinkedIn Post (Square) (1080x1080)' },
    { value: 'twitterProfile', label: 'Twitter Profile (400x400)' },
    { value: 'twitterPostLandscape', label: 'Twitter Post (Landscape) (1600x900)' },
    { value: 'twitterPostPortrait', label: 'Twitter Post (Portrait) (1080x1350)' },
  ];
  selectedPlatform: string = 'instagramProfile'; // Default platform
  format!: any;
  quality: any = 10;
  position!: any;
  formatOptions = ['webp', 'jpg', 'png', 'auto', 'avif'];
  positionOptions = ['center', 'top', 'bottom', 'left', 'right'];

  constructor(private http: HttpClient) {
  }

  authenticator = async () => {
    try {
      this.loading = true;
      const response = await fetch(this.authUrl);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error?.message}`);
    }
  };

  validateFileFunction(res: any) {
    console.log('validating')
    if (res.size < 1000000) { // Less than 1mb
      return true;
    }
    return false;
  }

  onUploadStartFunction(res: any) {
    console.log('onUploadStart')
  }

  onUploadProgressFunction(res: any) {
    console.log('progressing')
  }

  handleUploadSuccess(res: any) {
    console.log('File upload success with response: ', res);
    this.defaultImgUrl = res.url;
    this.imageUrl = this.defaultImgUrl;
    this.getTransformedImageUrl();
    this.loading = false;
  }

  handleUploadError(err: any) {
    console.log('There was an error in upload: ', err);
    // this.uploadErrorMessage = 'File upload failed.';
  }

  getTransformedImageUrl() {
    this.loading = true;
    const platformTransformations: any = {
      instagramProfile: {
        w: 320,
        h: 320,
        fit: 'cover',
      },
      instagramLandscape: {
        w: 1080,
        h: 566,
        fit: 'cover',
      },
      instagramPostSquare: {
        w: 1080,
        h: 1080,
        fit: 'cover',
      },
      instagramStory: {
        w: 1080,
        h: 1920,
        fit: 'cover',
      },
      facebookProfile: {
        w: 196,
        h: 196,
        fit: 'cover',  // Ensure full face is visible
      },
      facebookPostLandscape: {
        w: 1200,
        h: 628,
        fit: 'cover',
      },
      facebookPostSquare: {
        w: 1080,
        h: 1080,
        fit: 'cover',
      },
      facebookCover: {
        w: 823,
        h: 315,
        fit: 'cover',
      },
      linkedinProfile: {
        w: 400,
        h: 400,
        fit: 'cover',  // Ensure full face/logo is visible
      },
      linkedinPostLandscape: {
        w: 757,
        h: 402,
        fit: 'cover',
      },
      linkedinPostSquare: {
        w: 1080,
        h: 1080,
        fit: 'cover',
      },
      twitterProfile: {
        w: 400,
        h: 400,
        fit: 'cover',  // Ensure full face/logo is visible
      },
      twitterPostLandscape: {
        w: 1600,
        h: 900,
        fit: 'cover',
      },
      twitterPostPortrait: {
        w: 1080,
        h: 1350,
        fit: 'cover',
      },
    };

    const transformation = platformTransformations[this.selectedPlatform];


    if (transformation) {
      const params = new URLSearchParams(transformation);
      // this.imageUrl = `https://imageground.netlify.app/.netlify/images?url=${this.defaultImgUrl}&fit=cover&w=1024&h=1024&position=center&q=50&fm=png`;
      this.imageUrl = `https://img-playground.netlify.app/.netlify/images?url=${this.defaultImgUrl}&${params}`;
      if (this.format) {
        this.imageUrl += `&fm=${this.format}`;
      }
      if (this.position) {
        this.imageUrl += `&position=${this.position}`;
      }
      if (this.quality) {
        this.imageUrl += `&q=${this.quality}`;
      }
      this.loading = false;
    } else {
      console.warn(`No transformation defined for platform: ${this.selectedPlatform}`);
      this.imageUrl = this.defaultImgUrl; // Use original image URL if no transformation available
      this.loading = false;
    }
  }
  downloadImage() {
    const link = document.createElement('a');
    link.href = this.imageUrl;
    link.download = `transformed_image.${this.getExtensionFromUrl(this.imageUrl)}`;
    link.click();
  }

  getExtensionFromUrl(url: string): string {
    const parts = url.split('.');
    return parts[parts.length - 1];
  }

  downloadImages() {
    const imageUrl = this.imageUrl // Replace with your image URL

    this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.jpg'; // Change the filename if needed
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }
}
