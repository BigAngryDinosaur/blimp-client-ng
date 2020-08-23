import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Blimp';

  constructor(private authService: AuthService) { 
    authService.authenticate();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout()
  }
}
