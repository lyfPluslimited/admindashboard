import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuth } from '../models/user.model';
import { ConfigService } from './config.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private spinner: NgxSpinnerService
    ) {
    this.loggedIn = !!localStorage.getItem('auth_token')
   }

   login(email, pass){
      this.firebaseAuth.signInWithEmailAndPassword(email, pass).then(res => {
        console.log(res)
        localStorage.setItem('auth_token', Date.now().toString())
          this.loggedIn = true
          this.spinner.hide()
          this.router.navigate(['dashboard']);
      }).catch(err => {
        console.log(err)
        this.spinner.hide()
        this.router.navigate(['/login'])
      })
    
      // this.spinner.hide()
      // this.router.navigate(['/login'])


    // return this.http.post<UserAuth>(`${this.config.REST_API_URL}/login-admin`, data).pipe(map(res => {
    //   if(res.success){
    //     localStorage.setItem('auth_token', res.auth_token)
    //     this.loggedIn = true
    //     return res
    //   } else{
    //     return res
    //   }
    // }))
   }

   logout(){
     localStorage.removeItem('auth_token')
     this.loggedIn = false
     this.firebaseAuth.signOut()
     this.router.navigate(['/login'])
   }

   isLoggedIn(){
     return this.loggedIn
   }

}
