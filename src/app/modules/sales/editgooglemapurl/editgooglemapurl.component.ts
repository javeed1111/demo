import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';


@Component({
  selector: 'app-editgooglemapurl',
  templateUrl: './editgooglemapurl.component.html',
  styleUrls: ['./editgooglemapurl.component.scss']
})
export class EditgooglemapurlComponent implements OnInit {
  showOnWebsite: boolean; 
 
  name: string;
  
  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  butdisabled: boolean;
  Id: any;
  CompanylogoAlt: string;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,) { }

  ngOnInit(): void {
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.ConfigurationForm = this._formBuilder.group({
      GoogleMapUrl : ['', [Validators.required]],
     
      showOnWebsite: [''],
     
    });

    this.Edit(id, value);

  }
  cancel() {
    this._router.navigate(['/masters/googlemapurl']);
    setTimeout(() => {
      window.location.reload();
    }, 10);

  }

  Edit(id: any, value: any) {
    this.Id=id
    //
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled = true;
      this.ConfigurationForm.controls['GoogleMapUrl'].disable();
      
      this.ConfigurationForm.controls['showOnWebsite'].disable();
     

    }
    else {
      
      this.butdisabled = false;
      this.ConfigurationForm.controls['GoogleMapUrl'].enable();   
      this.ConfigurationForm.controls['showOnWebsite'].enable();
     
    }

    this._authService.GetgooglemapById(id).subscribe((finalresult: any) => {
      
      console.log(finalresult);

      if (finalresult.status == "200") {
        
       // this.name= finalresult.result.companylogo
        // this.ConfigurationForm.patchValue(finalresult.result);
         this.ConfigurationForm.patchValue({
          GoogleMapUrl: finalresult.result.googleMapUrl,
          showOnWebsite: finalresult.result.showOnWebsite,       
         }   
         );

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
      GoogleMapUrl: content.GoogleMapUrl,    
      showOnWebsite:content.showOnWebsite,
      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
      //  IsActive: this.active,
    }
    this._authService.Updategooglemap(data).subscribe((result: any) => {
      
      if (result.status == "200") {
        

        // Set the alert
        this.alert = {
          type: 'success',
          //message: result.message
          message: result.message
        };

        // Show the alert
        this.showAlert = true;

        setTimeout(() => {
          this._router.navigate(['/masters/googlemapurl']);
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
