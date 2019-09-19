import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { ServerService } from '../services/server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private serverservice: ServerService,
              private route: Router) {}

  canActivate(): boolean {
    if(this.serverservice.loggedIn()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
  
}
