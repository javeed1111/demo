import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-adddashboardbanner',
  templateUrl: './adddashboardbanner.component.html',
  styleUrls: ['./adddashboardbanner.component.scss']
})
export class AdddashboardbannerComponent implements OnInit {
  bannerForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
  


  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,) { }

  ngOnInit(): void {

    this.bannerForm = this._formBuilder.group({
      title       : ['', [Validators.required]],
      description    : ['', []],
  

    });
  }

  cancel(){
    this._router.navigate(['/masters/dashboardbanner']);
        setTimeout(() => {
            window.location.reload();
           }, 10);

  }
  Save()
  {
      debugger
      if (this.bannerForm.invalid) {
          return;
      }
      //this.showAlert = false;
      
      // Get the contact object
      const content = this.bannerForm.getRawValue();
    //   if(this.active==undefined){
    //      this.active = true;
    //  }
      var data = {
         Title: content.title,
         Description: content.description,
         CreatedBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
     }
      this._authService.AddBannerContent(data).subscribe((result: any) => {
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
                }, 2000); 
                // setTimeout(() => {
                  
                  this._router.navigate(['/masters/dashboardbanner']);
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


}
