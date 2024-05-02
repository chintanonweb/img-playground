import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css',
})
export class ImageSliderComponent {
  images: string[] = [
    'https://efoodorder.netlify.app/assets/1.png',
    'https://efoodorder.netlify.app/assets/2.png',
    'https://efoodorder.netlify.app/assets/3.png',
    'https://efoodorder.netlify.app/assets/4.png',
    'https://efoodorder.netlify.app/assets/5.png',
    'https://efoodorder.netlify.app/assets/6.png',
  ];
  selectedImage!: string;
  selectedImageIndex!: number;
  width: number = 800;
  height: number = 600;
  quality: number | null = null; // Allow optional quality input
  fitOptions = ['cover', 'contain', 'fill'];
  fit!: any;
  format!: any;
  position!: any;
  formatOptions = ['webp', 'auto', 'avif'];
  positionOptions = ['center', 'top', 'bottom', 'left', 'right'];

  ngOnInit() {
    // Select the first image by default
    this.selectedImageIndex = 0;
    // this.selectedImage = this.images[0];
    this.generateImageUrl();
  }

  selectImage(image: string, index: number) {
    this.selectedImage = image;
    this.selectedImageIndex = index;
    this.generateImageUrl();
  }

  generateImageUrl() {
    // Base URL
    let url = 'https://efoodorder.netlify.app/.netlify/images?url=' + encodeURIComponent(this.images[this.selectedImageIndex]);

    // Add width parameter
    if (this.width) {
      url += `&w=${this.width}`;
    }

    // Add height parameter
    if (this.height) {
      url += `&h=${this.height}`;
    }

    // Add format parameter
    if (this.format) {
      url += `&fm=${this.format}`;
    }

    // Add fit parameter
    if (this.fit) {
      url += `&fit=${this.fit}`;
    }

    // Add position parameter
    if (this.position) {
      url += `&pos=${this.position}`;
    }

    // Add quality parameter
    if (this.quality) {
      url += `&q=${this.quality}`;
    }

    // Update the selected image with the generated URL
    this.selectedImage = url;
  }

}
