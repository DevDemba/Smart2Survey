import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _auth:AuthService, private router: Router) { }

  canActivate() {
    if (!this._auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
