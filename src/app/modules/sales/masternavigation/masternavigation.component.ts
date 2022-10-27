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

  configuration(){

    debugger

    this._router.navigate(['/masters/configurations']);

  }

  dashboardbanner(){

    this._router.navigate(['/masters/dashboardbanner']);
  }
  companydetails(){
debugger
    this._router.navigate(['/masters/companydetails']);
  }

  termsandpolicy(){
    debugger
        this._router.navigate(['/masters/termsandpolicy']);
  }
  emailsetttings(){
    debugger
        this._router.navigate(['/masters/emailsettings']);

      }
      googlemapurl(){
        debugger
            this._router.navigate(['/masters/googlemapurl']);
    
          }

}
