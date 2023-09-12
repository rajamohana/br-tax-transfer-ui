import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//import { UserAuthenticationService } from '../../services/user-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthentic: boolean = false;
  userName: string = '';
  xpandStatus:boolean = false;

  constructor(private httpClient: HttpClient, //private userAuth: UserAuthenticationService, 
    private  router: Router) {}

  ngOnInit() {
    // if( this.userAuth.authenticated === false ){
    //   this.router.navigateByUrl('/');
    // } else {
    //   this.isAuthentic = this.userAuth.authenticated;
    //   this.userName = this.userAuth.userName;
    // }
  }

  // authenticated() { 
  //   return this.userAuth.authenticated;
  // }

   logout() {
  //   this.httpClient.post('/server/api/logout', {}).subscribe(
  //     () => {
  //      // this.userAuth.authenticated = false;
  //       this.router.navigateByUrl('/');
  //     }
  //   );  
   }

}
