import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    private userAuth: UserAuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userAuth.subject.next('');
    localStorage.clear();
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

    // let data = { isAuthenticated: true, userName: 'Siva kumar' };
    // localStorage.setItem('userDetails', JSON.stringify(data));
    // this.userAuth.setProperty();
    // this.router.navigate(['/home']);
      this.userAuth.authenticate(this.loginForm.value, () => {
        if (this.userAuth.authenticated === true) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Incorrect Username / Password!';
        }
      });
      this.loginForm.reset();
      return false;
  }
}
