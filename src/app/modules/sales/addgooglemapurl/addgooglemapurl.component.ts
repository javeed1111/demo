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
  update: boolean;
  save: boolean;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.ConfigurationForm = this._formBuilder.group({
      id : [''],
      googleMapUrl : ['', [Validators.required]],
      
    });
    this.CheckForUpdate();

  }
  CheckForUpdate() {
    this._authService.Getgooglemap().subscribe((res: any) => {
      debugger
      if (res.result.length > 0) {
        this.ConfigurationForm.patchValue(res.result[0]);
        this.update = true;
        this.save = false
      }
      else {
        this.ConfigurationForm.reset();
        this.update = false;
        this.save = true;
      }
    })
  }
  cancel(){
    this._router.navigate(['/masters/masternavigation']);
 
  }
  Save()
  {
      debugger
      if (this.ConfigurationForm.invalid) {
          return;
      }
      const content = this.ConfigurationForm.getRawValue();
  
      var data = {
        GoogleMapUrl: content.googleMapUrl,
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
                  window.location.reload();
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

  Update() {

    if (this.ConfigurationForm.invalid) {
      return;
    }
    this.showAlert = false;

    const content = this.ConfigurationForm.getRawValue();
debugger
    var data = {
      Id: content.id,
      GoogleMapUrl: content.googleMapUrl,    
      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
    }
    this._authService.Updategooglemap(data).subscribe((result: any) => {
      debugger
      if (result.status == "200") {
        debugger

        // Set the alert
        this.alert = {
          type: 'success',
          //message: result.message
          message: result.message
        };

        // Show the alert
        this.showAlert = true;

        setTimeout(() => {
        window.location.reload();
        }, 1000);
      }
      else {
        this.alert = {
          type: 'error',
          message: result.message

        };
        this.showAlert = true;
      }
      (error) => {

      }
    });
 
  }


}
