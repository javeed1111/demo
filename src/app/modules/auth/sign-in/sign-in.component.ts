import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    companylogo: any;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            mobileno : ['', [Validators.required]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });
        this.GetCompanydetails();
    }

    GetCompanydetails()
    {
        debugger
        this._authService.GetCompanydetails().subscribe((result: any) => {
          debugger
             var result = JSON.parse(result);
              if (result.status == "200") {
                  
                  console.log('details',result.result)
                if(result.result[0].companylogo!="")
                  this.companylogo=result.result[0].companylogo;
                else
                this.companylogo="assets/images/logo/logo1.png";
                  
                  setTimeout(() => {
                  }, 1000);
              }
              else {
              }
              (error) => {
  
     
             }
          });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
     signIn(): void
     {
         // Return if the form is invalid
         if ( this.signInForm.invalid )
         {
             return;
         }
 
         // Disable the form
         this.signInForm.disable();
 
         // Hide the alert
         this.showAlert = false;
 
         // Sign in
         this._authService.signIn(this.signInForm.value)
             .subscribe(
                 () => {
 
                     // Set the redirect url.
                     // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                     // to the correct page after a successful sign in. This way, that url can be set via
                     // routing file and we don't have to touch here.
                     const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
 
                     // Navigate to the redirect url
                     this._router.navigateByUrl(redirectURL);
 
                 },
                 (response) => {
                     //
                     if(response.status=='200'){
                         //
                        localStorage.setItem("firstname", response.result.firstName);
                        localStorage.setItem("lastname", response.result.lastName);
                        localStorage.setItem("email", response.result.email);
                        localStorage.setItem("LoginId", response.result.id);
                        localStorage.setItem("token", response.result.token);
                     }
                     
                     else if(response.status=='400'){
                     // Re-enable the form
                     this.signInForm.enable();
 
                     // Reset the form
                     this.signInNgForm.resetForm();
 
                     // Set the alert
                     this.alert = {
                         type   : 'error',
                         message: 'Wrong UserName or password'
                     };
 
                     // Show the alert
                     this.showAlert = true;
                    }
                    else{
                        // Re-enable the form
                     this.signInForm.enable();
 
                     // Reset the form
                     this.signInNgForm.resetForm();
 
                     // Set the alert
                     this.alert = {
                         type   : 'error',
                         message: 'Something Went Wrong'
                     };
 
                     // Show the alert
                     this.showAlert = true;

                    }
                 }
             );
     }
    //  signIn(): void
    //  {
    //      //
    //      // Return if the form is invalid
    //      if ( this.signInForm.invalid )
    //      {
    //          return;
    //      }
 
    //      // Disable the form
    //      this.signInForm.disable();
 
    //      // Hide the alert
    //      this.showAlert = false;
    //      var data= {
    //         mobileno:this.signInForm.value.mobileno,
    //         password:this.signInForm.value.password
    //        }
 
    //      // Sign in
    //      this._authService.UserLogin(data)
    //          .subscribe(
    //              () => {
    //                  //
 
    //                  // Set the redirect url.
    //                  // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
    //                  // to the correct page after a successful sign in. This way, that url can be set via
    //                  // routing file and we don't have to touch here.
    //                 //  if(response){}
    //                  const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
 
    //                  // Navigate to the redirect url
    //                  this._router.navigateByUrl(redirectURL);
 
    //              },
    //              (response) => {
    //                 //
    //                 if(response.status=='200'){
    //                     localStorage.setItem("firstname", response.result.firstName);
    //             localStorage.setItem("lastname", response.result.lastName);
    //             localStorage.setItem("email", response.result.email);
    //             localStorage.setItem("LoginId", response.result.userId);
    //             localStorage.setItem("token", response.result.token);
    //                 }
    //                 // Re-enable the form
    //                 this.signInForm.enable();

    //                 // Reset the form
    //                 this.signInNgForm.resetForm();

    //                 // Set the alert
    //                 this.alert = {
    //                     type   : 'error',
    //                     message: 'Wrong UserName or password'
    //                 };

    //                 // Show the alert
    //                 this.showAlert = true;
    //             }
    //         );
    //  }
     
 
    /**
     * Sign in
     */
    // signInm(){
    //     //
    //     // Return if the form is invalid
    //     if ( this.signInForm.invalid )
    //     {
    //         return;
    //     }
    //     // Disable the form
    //     this.signInForm.disable();

    //     // Hide the alert
    //     this.showAlert = false;
    //     var data= {
    //      mobileno:this.signInForm.value.mobileno,
    //      password:this.signInForm.value.password
    //     }

    //     // Sign in
    //     this._authService.UserLogin(data).subscribe(
    //         (finalresult: any) => {
    //             //;
    //             const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
 
    //                  // Navigate to the redirect url
    //                  this._router.navigateByUrl(redirectURL);
            
    //         if (finalresult.status == "200") {
    //             //
    //             localStorage.setItem("firstname", finalresult.result.firstName);
    //             localStorage.setItem("lastname", finalresult.result.lastName);
    //             localStorage.setItem("email", finalresult.result.email);
    //             localStorage.setItem("LoginId", finalresult.result.userId);
    //             localStorage.setItem("token", finalresult.result.token);

    //           }
              
    //         else {
    //             // Re-enable the form
    //             this.signInForm.enable();
 
    //             // Reset the form
    //             this.signInNgForm.resetForm();
    //             this.alert = {
    //                 type   : 'error',
    //                 message: finalresult.message
    //             }
    //             // Show the alert
    //             this.showAlert = true;
    //            // this.notifications.alert('Alert', finalresult.message, NotificationType.Alert, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
    //           }
    //         (error) => {
    //             // Re-enable the form
    //             this.signInForm.enable();
 
    //             // Reset the form
    //             this.signInNgForm.resetForm();
    //           this.alert = {
    //             type   : 'error',
    //             message: error.message
            
    //         };
    //         // Show the alert
    //         this.showAlert = true;
    //     }
    //          // this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
    //         });
    //       }
}
