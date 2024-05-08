import { Routes } from '@angular/router';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { BlobPlaygroundComponent } from './blob-playground/blob-playground.component';
import { NewsPlaygroundComponent } from './news-playground/news-playground.component';

export const routes: Routes = [
    { path: '', component: ImageSliderComponent },
    { path: 'blob-playground', component: BlobPlaygroundComponent },
    { path: 'news-playground', component: NewsPlaygroundComponent },
];
