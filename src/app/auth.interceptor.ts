import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

//implemented based on: https://angular.dev/guide/http/interceptors
export const myAuthInterceptor: HttpInterceptorFn = (req, next) => {

  const skipUrls = [
    'https://api.bigdatacloud.net/data/reverse-geocode-client',
  ];

  const shouldSkip = skipUrls.some(url => req.url.includes(url));

  if (shouldSkip) {
    return next(req);
  }
  
  const oauthService = inject(OAuthService);
  const token = oauthService.getAccessToken();

  if (token && req.url.includes('indigo-bat-40212.zap.cloud:4582')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};