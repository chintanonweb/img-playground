import { Routes } from '@angular/router';
import { BlobListComponent } from './blob-list/blob-list.component';
import { BlobUploadComponent } from './blob-upload/blob-upload.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';

export const routes: Routes = [
    { path: '', component: ImageSliderComponent },
    { path: 'blob-list', component: BlobListComponent },
    { path: 'blob-upload', component: BlobUploadComponent },
];
