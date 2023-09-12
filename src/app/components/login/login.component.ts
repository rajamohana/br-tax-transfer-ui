import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAuthenticationService } from '../../services/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: any;
  errorMessage: string = '';

  constructor(
    private httpClient: HttpClient,
    private userAuth: UserAuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.clearMessage();
    if (this.userAuth.authenticated === true) {
      this.router.navigateByUrl('/logged-user');
    }
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  clearMessage() {
    if (this.userAuth.authenticated === false) {
      this.errorMessage = '';
    }
  }

  login() {
    this.router.navigate(['/home']);
    // this.userAuth.authenticate(this.loginForm.value, () => {
    //   if (this.userAuth.authenticated === true) {
    //     localStorage.setItem('isUserLogged', 'true');
    //     this.router.navigateByUrl('/tasks');
    //   } else {
    //     console.log('User not authenticated!');
    //     this.errorMessage = 'Incorrect Username / Password!';
    //   }
    // });
    // this.loginForm.reset();
    // return false;
  }
}
