import { NgModule } from '@angular/core';
import { IkUploadComponent, ImagekitioAngularModule } from 'imagekitio-angular';

@NgModule({
  imports: [
    ImagekitioAngularModule.forRoot({
        publicKey: "public_9Gby0dSbIWvpZa3fuvQVi0Uj1e8=",// or environment.publicKey
        urlEndpoint: "https://ik.imagekit.io/bky1q24gfc",// or environment.urlEndpoint
      })
  ],
  declarations: [],
  exports: [IkUploadComponent]
})
export class IkUploadWrapperModule { }