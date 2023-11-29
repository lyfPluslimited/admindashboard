import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private spinner: NgxSpinnerService,
    private router: Router,

    ) { }

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  onSubmit(){
    this.spinner.show()
    if(this.loginForm.get('email').value == 'admin@admin.com'){
      console.log(this.loginForm.get('password').value);
      
      this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    }
    this.spinner.hide()
    this.router.navigate(['/login'])
  }

}
