import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-addgooglemapurl',
  templateUrl: './addgooglemapurl.component.html',
  styleUrls: ['./addgooglemapurl.component.scss']
})
export class AddgooglemapurlComponent implements OnInit {
  showonwebsite: boolean;
  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };
  showAlert:  boolean = false;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.ConfigurationForm = this._formBuilder.group({
      googlemapurl : ['', [Validators.required]],
      
    });
  }
  cancel(){
    this._router.navigate(['/masters/googlemapurl']);
 
  }
  Save()
  {
      debugger
      if (this.ConfigurationForm.invalid) {
          return;
      }
      if(this.showonwebsite==undefined){
        this.showonwebsite=true
      }
    

     // formdata.append("showOnWebsite", (this.showonwebsite).toString())
      //this.showAlert = false;
      
      // Get the contact object
      const content = this.ConfigurationForm.getRawValue();
    //   if(this.active==undefined){
    //      this.active = true;
    //  }
   
      var data = {
      
        showOnWebsite:this.showonwebsite,
        GoogleMapUrl: content.googlemapurl,
      
        
         CreatedBy: parseInt(localStorage.getItem("LoginId")),
         //IsActive: this.active,
    }
   
      this._authService.AddGooglemapurl(data).subscribe((result: any) => {
          debugger
          //  var result = JSON.parse(result);
            if (result.status == "200") {
                //debugger
                 // Set the alert
                 this.alert = {
                  type   : 'success',
                  message: result.message
              };
              // Show the alert
              this.showAlert = true;
                setTimeout(() => {
                  
                  this.showAlert = false;
                  this._router.navigate(['/masters/companydetails']);
                }, 2000); 
                // setTimeout(() => {
                  // this._router.navigate(['/masters/companydetails']);
                // }, 2000); 
                
            }
            else {
             // Set the alert
             this.alert = {
              type   : 'error',
              message: result.message
          };
          // Show the alert
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
            }
            (error) => {
   
           }
        });
  }
  onwebsite($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked == undefined || $event.checked == true) {
      this.showonwebsite = $event.checked;
    }
    else {
      this.showonwebsite = false;
      // this.isofferactive = false;
    }

  }
}
