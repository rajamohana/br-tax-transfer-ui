import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  subject = new BehaviorSubject<any>('');
  authenticated: boolean = false;
  userRole: string = '';
  userName: string = '';
  //userType: string = '';
  isClient: boolean = false;
  isQA: boolean = false;
  isDS: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.setProperty();
  }

  setProperty() {
    const userDetails = localStorage.getItem('userDetails');
    this.subject.next(userDetails);
  }

  authenticate(credentials: any, callback: any) {
    const headers = new HttpHeaders(
      credentials
        ? {
            authorization:
              'Basic ' +
              btoa(credentials.username + ':' + credentials.password),
          }
        : {}
    );
    headers.set('X-Requested-With', 'XMLHttpRequest');
    this.httpClient
      .get(`${this.configService.globalApi}/api/user`, { headers: headers })
      .subscribe(
        (response: any) => {
          if (response['authenticated']) {
            this.authenticated = true;
            this.userName =
              response['principal'].firstName +
              ' ' +
              response['principal'].lastName;
            if (response['authorities'].length > 0) {
              for (let i = 0; i < response['authorities'].length; i++) {
                this.userRole += response['authorities'][i].authority + `-`;
              }
              this.userRole = this.userRole.slice(0, -1);
              this.isClient = this.userRole.includes('ROLE_CLIENT')
                ? true
                : false;
              this.isQA = this.userRole.includes('ROLE_QA') ? true : false;
              this.isDS = this.userRole.includes('ROLE_DATA_SPEC')
                ? true
                : false;
            }
            let data = { isAuthenticated: this.authenticated, userName: this.userName };
            localStorage.setItem('userDetails', JSON.stringify(data));
            this.setProperty();
            return callback && callback();
          } else {
            this.authenticated = false;
          }
        },
        (err) => {
          console.log('Failed to authenticate user!');
          this.authenticated = false;
          return callback && callback();
        }
      );
  }

  logout() {
    console.log('Logout from user-authentication service');
    this.authenticated = false;
  }
}
