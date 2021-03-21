import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class NavigationService {
  constructor(private router: Router) {

  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToDepartments() {
    this.router.navigate(['/department']);
  }
  goToQuestion() {
    this.router.navigate(['/question']);
  }
  goToWelcome() {
    this.router.navigate(['/welcome']);
  }

  goToDepartmentById(id: number) {
    this.router.navigate([('/department/' + id)]);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToUnAuthorized() {
    this.router.navigate(['/unauthorized']);
  }

  goToSessionTimedOut() {
    this.router.navigate(['/sessiontimedout']);
  }

  isOnLoginScreen(): boolean {
    return this.router.url === '/login';
  }

  goToShortCode(id) {
    this.router.navigate(['/shortcode/' + id]);
  }

  goToAddTopup(id) {
    this.router.navigate(['/topuprequest/' + id ]);
  }
}
