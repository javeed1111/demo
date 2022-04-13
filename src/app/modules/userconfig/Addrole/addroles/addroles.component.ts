import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-addroles',
  templateUrl: './addroles.component.html',
  styleUrls: ['./addroles.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddrolesComponent implements OnInit {
  active: boolean;
  roleForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
  

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
    //this.searchElement.nativeElement.focus();
        // Create the contact form
        this.roleForm = this._formBuilder.group({
          roleName       : ['', [Validators.required]],
          description    : ['', []],
            // userchkactive: ['']

        });
  }
  cancel(){
    this._router.navigate(['/userconfig/role/']);
        setTimeout(() => {
            window.location.reload();
           }, 10);

  }
  AddRole()
  {
      debugger
      if (this.roleForm.invalid) {
          return;
      }
      //this.showAlert = false;
      
      // Get the contact object
      const contact = this.roleForm.getRawValue();
    //   if(this.active==undefined){
    //      this.active = true;
    //  }
      var data = {
         RoleName: contact.roleName,
         Description: contact.description,
         CreatedBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
     }
      this._authService.Addrole(data).subscribe((result: any) => {
          debugger
           var result = JSON.parse(result);
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
                  
                  this._router.navigate(['/userconfig/role']);
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
  // toggleCompleted($event: MatSlideToggleChange): void
  //   {
  //       //debugger
  //       if($event.checked!=undefined){
  //           this.active = $event.checked;
  //       }
  //       else{
  //           this.active = true;
  //       }
  //   }

}
