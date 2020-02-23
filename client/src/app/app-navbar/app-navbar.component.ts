import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavbarComponent {

  constructor(
    private router: Router,
  ) { }

  get isLoggedIn(): boolean {
    return false; // todo: inject a LoggedInUserService
  }

  get loggedInUserName(): string {
    return 'todo'; // todo: service
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  goToLogout() {
    this.router.navigateByUrl('/auth/logout');
  }

  goToAccount() {
    this.router.navigateByUrl('/account/settings'); // todo: figure this out
  }
}
