import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { ImgGeneratorComponent } from '../img-generator/img-generator.component';

@Component({
  selector: 'app-img-playground',
  standalone: true,
  imports: [ImageSliderComponent, ImgGeneratorComponent],
  templateUrl: './img-playground.component.html',
  styleUrl: './img-playground.component.css'
})
export class ImgPlaygroundComponent {

}
