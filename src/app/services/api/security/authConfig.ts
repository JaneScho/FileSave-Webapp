import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {

  issuer: 'http://indigo-bat-40212.zap.cloud:4583/realms/quarkus',
  
  clientId: 'filesave',
  
  redirectUri: window.location.origin + '/index.html',
  
  responseType: 'code',     
  scope: 'openid profile email',
  requireHttps: false,      
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false
};