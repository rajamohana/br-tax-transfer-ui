import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((res: any) => {
      console.log(res);
    });
  }
}