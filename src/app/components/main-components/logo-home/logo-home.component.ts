import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo-home',
  templateUrl: './logo-home.component.html',
  styleUrls: ['./logo-home.component.scss']
})
export class LogoHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  homePage() {
    this.router.navigate(["/"], { replaceUrl: false });
  }
}
