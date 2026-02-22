import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const myAuthInterceptor: HttpInterceptorFn = (req, next) => {

  const skipUrls = [
    'https://api.bigdatacloud.net/data/reverse-geocode-client',
    // add other external APIs here
  ];

  const shouldSkip = skipUrls.some(url => req.url.includes(url));

  if (shouldSkip) {
    // Pass the request through exactly as is
    return next(req);
  }
  
  const oauthService = inject(OAuthService);
  const token = oauthService.getAccessToken();

  // If we have a token and the URL is for our backend, add the header
  if (token && req.url.includes('indigo-bat-40212.zap.cloud:4582')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};