/*import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';

import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';

defineCustomElements(window);
if(environment.production){
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideOAuthClient({
      resourceServer: {
        // Replace with your partner's IP
        allowedUrls: ['http://indigo-bat-40212.zap.cloud:4582'],
        sendAccessToken: true
      }
    }),
  ],
});*/

import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';

// IMPORTANT IMPORTS
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { myAuthInterceptor } from './app/auth.interceptor'; // Import the file you just created

defineCustomElements(window);
if(environment.production){
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    
    // Use withInterceptors with your new custom interceptor
    provideHttpClient(
      withInterceptors([myAuthInterceptor])
    ),

    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    provideOAuthClient({
      resourceServer: {
        allowedUrls: ['http://indigo-bat-40212.zap.cloud:4582'],
        sendAccessToken: true
      }
    }),
  ],
});