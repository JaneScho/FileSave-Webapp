import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../services/api/security/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  private authService = inject(AuthService);
  
  constructor() { }

  ngOnInit() {
  }

  login() {
    this.authService.login();

  }

}
