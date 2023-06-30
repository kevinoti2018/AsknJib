import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let role=localStorage.getItem('role')
    // this.authService.isAdmin()
    if (this.authService.isLoggedIn() && role =='true') {
      
      return true;
    } else {
     
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/unauthorized']);
      }
      return false;
    }
  }
}
