import { Capacitor } from '@capacitor/core';

import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // 1. Your partner's Keycloak server
  issuer: 'http://indigo-bat-40212.zap.cloud:4583/realms/quarkus',
  
  // 2. The ID set in Keycloak
  clientId: 'filesave',
  
  // 3. The "Landing Pad" (The URL Keycloak sends you back to)
  redirectUri: window.location.origin + '/index.html',
  
  // 4. Modern settings for version 20.0.2
  responseType: 'code',      // PKCE is automatic in v20 with 'code'
  scope: 'openid profile email',
  requireHttps: false,       // Since your server is HTTP
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false // Necessary for HTTP dev
};