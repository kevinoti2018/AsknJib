import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      // User is logged in and has admin role, allow access
      
      return true;
    } else {
      // User is not logged in or doesn't have admin role, redirect to login page or unauthorized page
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/unauthorized']);
      }
      return false;
    }
  }
}
