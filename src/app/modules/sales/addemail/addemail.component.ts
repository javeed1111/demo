import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';


@Component({
  selector: 'app-addemail',
  templateUrl: './addemail.component.html',
  styleUrls: ['./addemail.component.scss']
})
export class AddemailComponent implements OnInit {

  showonwebsite: boolean;
  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
    
};
showAlert:  boolean = false;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) {

  
   }

  ngOnInit(): void {

    this.ConfigurationForm = this._formBuilder.group({
      User : ['', [Validators.required]],
      Password:['',[Validators.required]],
      Sender:['',[Validators.required]],
      Subject:['',],
      PortNo:['',],
      DisplayName:['',],
    });
  }
  cancel(){
    this._router.navigate(['/masters/emailsettings']);
        setTimeout(() => {
            window.location.reload();
           }, 10);

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
    debugger
      var data = {
        showOnWebsite:this.showonwebsite,
        user: content.User,
        password:content.Password,
        sender:content.Sender,
        subject:content.Subject,
        portNo:content.PortNo,
        displayName:content.DisplayName,

         CreatedBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
     }
      this._authService.AddEmail(data).subscribe((result: any) => {
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
                  this._router.navigate(['/masters/emailsettings']);
                }, 3000); 
                // setTimeout(() => {
                
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
            this.showAlert = true;
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
