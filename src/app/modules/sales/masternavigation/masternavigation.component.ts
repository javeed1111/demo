import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masternavigation',
  templateUrl: './masternavigation.component.html',
  styleUrls: ['./masternavigation.component.scss']
})
export class MasternavigationComponent implements OnInit {

  constructor(private _router: Router,) { }

  ngOnInit(): void {
  }

  configuration() {

    

    this._router.navigate(['/masters/configurations']);

  }

  dashboardbanner() {

    this._router.navigate(['/masters/dashboardbanner']);
  }
  // companydetails() {
  //   
  //   this._router.navigate(['/masters/companydetails']);
  // }
  companydetails() {
    
    this._router.navigate(['/masters/addcompanydetails']);
  }

  termsandpolicy() {
    
    this._router.navigate(['/masters/termsandpolicy']);
  }
  emailsetttings() {
    
    this._router.navigate(['/masters/addemail']);
  }
  googlemapurl() {
    
    this._router.navigate(['/masters/addgooglemapurl']);

  }

}
