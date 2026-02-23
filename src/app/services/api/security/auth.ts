import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './authConfig';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.initAuth();
  }

  private initAuth() {
    this.oauthService.configure(authCodeFlowConfig);
    
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      console.log('Discovery document loaded. Checking token...');

      if (this.oauthService.hasValidAccessToken()) {
        this.checkIdentity();
        this.router.navigate(['/tabs/gallery']);
      } else {
        console.log('No valid token found yet. Staying on login page.');
        this.router.navigate(['/login']);
      }
    }).catch(err => {
      console.error('Handshake failed:', err);
    });
  }

  public login() {
    this.oauthService.initCodeFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  checkIdentity() {
    const claims = this.oauthService.getIdentityClaims();
    console.log('Full Token Claims:', claims);
    
    if (claims) {
      console.log('Principal Name (sub):', claims['sub']); 
      console.log('Username (preferred_username):', claims['preferred_username']);
    }
  }
}
