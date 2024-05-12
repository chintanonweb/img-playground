import { Routes } from '@angular/router';
import { BlobPlaygroundComponent } from './blob-playground/blob-playground.component';
import { NewsPlaygroundComponent } from './news-playground/news-playground.component';
import { ImgGeneratorComponent } from './img-generator/img-generator.component';
import { ImgPlaygroundComponent } from './img-playground/img-playground.component';

export const routes: Routes = [
    { path: '', component: ImgPlaygroundComponent },
    { path: 'blob-playground', component: BlobPlaygroundComponent },
    { path: 'news-playground', component: NewsPlaygroundComponent },
    { path: 'img-generator', component: ImgGeneratorComponent },
];
