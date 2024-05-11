import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { PhotoService } from '../service/photo.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IkUploadWrapperModule } from '../ik-upload.module';
@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css',
})
export class ImageSliderComponent {
  images: any[] = [
    'https://efoodorder.netlify.app/assets/1.png',
    'https://efoodorder.netlify.app/assets/2.png',
    'https://efoodorder.netlify.app/assets/3.png',
    'https://efoodorder.netlify.app/assets/4.png',
    'https://efoodorder.netlify.app/assets/5.png',
    'https://efoodorder.netlify.app/assets/6.png',
  ];
  selectedImage!: string;
  previewUrl!: string;
  selectedImageIndex: number = 0;
  width: number = 800;
  height: number = 600;
  quality: number | null = 10; // Allow optional quality input
  fitOptions = ['cover', 'contain', 'fill'];
  fit!: any;
  format!: any;
  position!: any;
  formatOptions = ['webp', 'jpg', 'png', 'auto', 'avif'];
  positionOptions = ['center', 'top', 'bottom', 'left', 'right'];
  photos: any[] = [];

  constructor(private photoService: PhotoService,
    private http: HttpClient,
  ) { }
  ngOnInit() {
    // Select the first image by default
    // this.selectedImage = this.images[0];
    // this.generateImageUrl();
    this.photoService.getRandomImages().subscribe((images: any) => {
      // console.log(images);
      this.images = images;
      this.selectedImage = this.images[0];
      this.generateImageUrl();
    });
  }

  selectImage(image: string, index: number) {
    this.selectedImage = image;
    this.selectedImageIndex = index;
    this.generateImageUrl();
  }

  galleryImageUrl(img: string): string {
    let url = 'https://img-playground.netlify.app/.netlify/images?url=' + img + '&w=100&h=100&q=10';
    return url;
  }

  generateImageUrl() {

    const selectedImg = this.images[this.selectedImageIndex].urls.raw
    let url = 'https://img-playground.netlify.app/.netlify/images?url=' + selectedImg;
    // const selectedImg = this.images[this.selectedImageIndex]
    // let url = 'https://efoodorder.netlify.app/.netlify/images?url=' + encodeURIComponent(selectedImg);
    let previewUrl = '/.netlify/images?url=' + selectedImg;

    // Add width parameter
    if (this.width) {
      url += `&w=${this.width}`;
      previewUrl += `&w=${this.width}`;
    }

    // Add height parameter
    if (this.height) {
      url += `&h=${this.height}`;
      previewUrl += `&h=${this.height}`;
    }

    // Add format parameter
    if (this.format) {
      url += `&fm=${this.format}`;
      previewUrl += `&fm=${this.format}`;
    }

    // Add fit parameter
    if (this.fit) {
      url += `&fit=${this.fit}`;
      previewUrl += `&fit=${this.fit}`;
    }

    // Add position parameter
    if (this.position) {
      url += `&position=${this.position}`;
      previewUrl += `&position=${this.position}`;
    }

    // Add quality parameter
    if (this.quality) {
      url += `&q=${this.quality}`;
      previewUrl += `&q=${this.quality}`;
    }

    // Update the selected image with the generated URL
    this.selectedImage = url;
    this.previewUrl = previewUrl;
  }
}
