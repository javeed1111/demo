import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-editrole',
  templateUrl: './editrole.component.html',
  styleUrls: ['./editrole.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EditroleComponent implements OnInit {
  active: boolean;
  roleForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
  Id: any;
  userId: any;
  butdisabled:Boolean=false;


  

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    //debugger;
    var loginId = localStorage.getItem("LoginId"); 
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];
    


    this.roleForm = this._formBuilder.group({
      roleName       : ['', [Validators.required]],
      description    : ['', []],
      // isActive       : ['']

    });
    this.Edit(id, value);
  }
  cancel(){
    this._router.navigate(['/userconfig/role/']);
        setTimeout(() => {
            window.location.reload();
           }, 10);

  }
  Edit(id: any, value: any) {
    //debugger
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled=true;
      this.roleForm.controls['roleName'].disable();
      this.roleForm.controls['description'].disable();
  }
  else
  {
    this.butdisabled=false;
            this.roleForm.controls['roleName'].enable();
            this.roleForm.controls['description'].enable();

  }
    this.Id = id;
    this._authService.GetRoleById(this.Id).subscribe((finalresult: any) => {
        //debugger
        console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
        if (finalresult.status == "200") {
          //debugger

          this.roleForm.patchValue(finalresult.result);
         
            // if (finalresult.result.isActive == true) {
            //     var check = document.getElementById("userchkactive") as HTMLInputElement;
            //     check.checked = true;
            // }
            // else {
            //     var check = document.getElementById("userchkactive") as HTMLInputElement;
            //     check.checked = false;
            // }
            //  this.spinner.hide();
        }
        else {

        }
    });
  }
  UpdateRole()
  {
      //debugger
      if (this.roleForm.invalid) {
          return;
      }
      this.showAlert = false;
      
      // Get the contact object
      const contact = this.roleForm.getRawValue();

      // Go through the contact object and clear empty values
     //  contact.emails = contact.emails.filter(email => email.email);

     //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

      if(this.active==undefined){
         this.active = true;
     }
      var data = {
         RoleName: contact.roleName,
         Description: contact.description,
         UpdatedBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
         Id:this.approute.snapshot.params['id'],
     }
      this._authService.Updaterole(data).subscribe((result: any) => {
          
        //debugger
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
                  this._router.navigate(['/userconfig/role']);
                }, 1000);
            }
            else {
             this.alert = {
                 type   : 'error',
                 message: result.message
             
             };
             this.showAlert = true;
            }
            (error) => {
   
           }
        });
  }
  toggleCompleted($event: MatSlideToggleChange): void
    {
        //debugger
        if($event.checked!=undefined){
            this.active = $event.checked;
        }
        else{
            this.active = true;
        }
        //this.active=this.filters.hideCompleted$.next(change.checked);
    }


}
