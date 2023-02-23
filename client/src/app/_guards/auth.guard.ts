import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService,private toastr: ToastrService){

  }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if(user) return true;
        this.toastr.error('you shall not pass!')
        return false;
      })
    )
  }

}
