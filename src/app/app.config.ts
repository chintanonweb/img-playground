import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ImagekitioAngularModule } from 'imagekitio-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), importProvidersFrom(
    ImagekitioAngularModule.forRoot({
      publicKey: "public_9Gby0dSbIWvpZa3fuvQVi0Uj1e8=",// or environment.publicKey
      urlEndpoint: "https://ik.imagekit.io/bky1q24gfc",// or environment.urlEndpoint
    }))]
};
