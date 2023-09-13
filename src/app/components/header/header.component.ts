import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

//import { UserAuthenticationService } from '../../services/user-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthentic: boolean = false;
  userName: string = '';
  xpandStatus: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private userAuth: UserAuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userAuth.subject.subscribe((res: any) => {
      let data = JSON.parse(res);
      this.userName = data.userName;
      this.isAuthentic = data.isAuthenticated;
    });
  }
  // authenticated() {
  //   return this.userAuth.authenticated;
  // }

  logout() {
    localStorage.clear();
    this.userAuth.subject.next('');
    this.router.navigate(['/login']);
    // this.httpClient.post('/server/api/logout', {}).subscribe(() => {
    //   // this.userAuth.authenticated = false;
    //   this.router.navigateByUrl('/');
    // });
  }
}
