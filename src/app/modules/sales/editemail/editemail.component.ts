import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-editemail',
  templateUrl: './editemail.component.html',
  styleUrls: ['./editemail.component.scss']
})
export class EditemailComponent implements OnInit {

  showOnWebsite: boolean; 
  

  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  butdisabled: boolean;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,) { }

  ngOnInit(): void {
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.ConfigurationForm = this._formBuilder.group({
      User : ['', [Validators.required]],
      Password:['',[Validators.required]],
      Sender:['',[Validators.required]],
      Subject:['',[Validators.required]],
      PortNo:['',],
      DisplayName:['',],
      showOnWebsite: [''],
    });

    this.Edit(id, value);

  }
  cancel() {
    this._router.navigate(['/masters/emailsettings']);
    setTimeout(() => {
      window.location.reload();
    }, 10);

  }

  Edit(id: any, value: any) {
    //
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled = true;
      this.ConfigurationForm.controls['User'].disable();
      this.ConfigurationForm.controls['Password'].disable();
      this.ConfigurationForm.controls['Sender'].disable();
      this.ConfigurationForm.controls['Subject'].disable();
      this.ConfigurationForm.controls['PortNo'].disable();
      this.ConfigurationForm.controls['DisplayName'].disable();
      this.ConfigurationForm.controls['showOnWebsite'].disable();

    }
    else {
      this.butdisabled = false;
      this.ConfigurationForm.controls['User'].enable();
      this.ConfigurationForm.controls['Password'].enable();
      this.ConfigurationForm.controls['Sender'].enable();
      this.ConfigurationForm.controls['Subject'].enable();
      this.ConfigurationForm.controls['PortNo'].enable();
      this.ConfigurationForm.controls['DisplayName'].enable();
      this.ConfigurationForm.controls['showOnWebsite'].enable();
    }

    this._authService.GetEmailById(id).subscribe((finalresult: any) => {
      //
      console.log(finalresult);

      if (finalresult.status == "200") {
        

        this.ConfigurationForm.patchValue(finalresult.result);

        this.ConfigurationForm.controls['User'].setValue(finalresult.result.user)
      
        this.ConfigurationForm.controls['Password'].setValue(finalresult.result.password)
        this.ConfigurationForm.controls['Sender'].setValue(finalresult.result.sender)
        this.ConfigurationForm.controls['Subject'].setValue(finalresult.result.subject)
        this.ConfigurationForm.controls['PortNo'].setValue(finalresult.result.portNo)
        this.ConfigurationForm.controls['DisplayName'].setValue(finalresult.result.displayName)
        this.ConfigurationForm.controls['showOnWebsite'].setValue(finalresult.result.showOnWebsite)
      }
      else {

      }
    });
  }

  Save() {
    if (this.ConfigurationForm.invalid) {
      return;
    }
    this.showAlert = false;

    const content = this.ConfigurationForm.getRawValue();

    var data = {
      Id: this.approute.snapshot.params['id'],
      User: content.User,
      Password:content.Password,
    Sender:content.Sender,
      Subject:content.Subject,
      PortNo:content.PortNo,
      DisplayName:content.DisplayName,
      ShowOnWebsite:content.showOnWebsite,
      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
      //  IsActive: this.active,
    }
    this._authService.UpdateEmail(data).subscribe((result: any) => {
      
      if (result.status == "200") {
        

        // Set the alert
        this.alert = {
          type: 'success',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;

        setTimeout(() => {
          this._router.navigate(['/masters/emailsettings']);
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
    
    if(content.showOnWebsite!=undefined){
      this.showOnWebsite =content.showOnWebsite;
    }
  }

  onwebsite($event: MatSlideToggleChange): void {
    
    if ($event.checked == undefined || $event.checked == true) {
      this.showOnWebsite = $event.checked;
    }
    else {
      this.showOnWebsite = false;
      // this.isofferactive = false;
    }

  }
}

