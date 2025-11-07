import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TitleCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('product-ui');

  authService = inject(AuthenticationService);
  router = inject(Router);

  constructor() {
    this.authService.restoreAuth();
  }

  handleLogout(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
