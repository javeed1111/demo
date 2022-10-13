import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { FuseAlertType } from '@fuse/components/alert';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/auth/auth.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  isLinear: boolean = false
  displayedColumns = ['sno',  'emailaddress','mobilenumber', 'subscriptiondate'];
  dataSource: MatTableDataSource<any>;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };
  showAlert:  boolean = false;
  courseid: any;
  reviews: any;
  ReviewsForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  
  constructor(private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService,
    private approute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.courseid=this.approute.snapshot.params['id'];
    this.ReviewsForm = this._formBuilder.group({
    });

    this.GetReviews(this.courseid);
  }

  GetReviews(id:any){
    this._authService.GetReviews(id).subscribe((finalresult: any) => {
      debugger
      // var finalresult = JSON.parse(finalresult);
      this.reviews=finalresult.result


  })

  }

  selectionChange(event: StepperSelectionEvent) {
    debugger
    var value = "edit"
    console.log(event.selectedStep.label);
    let stepLabel = event.selectedStep.label
    if (stepLabel == "Step 1") {
      this._router.navigate(['/courses/editcourse/' + this.courseid + '/' + 'edit']);
    }
    if (stepLabel == "Step 2") {
      this._router.navigate(['/courses/addcoursemodule/' + this.courseid]);

    }
    if (stepLabel == "Step 3") {
      this._router.navigate(['/courses/addcoursecontent/' + this.courseid + '/' + value]);
    }
    if (stepLabel == "Step 4") {
      this._router.navigate(['/courses/questions/' + this.courseid]);
    }
    // if (stepLabel == "Step 6") {
    //   this._router.navigate(['/courses/subscriptions/'+this.courseid]);
    // }
  }

  GoToReviews() {
    this._router.navigate(['/courses/reviews/' + this.courseid]);

  }
  GoToSubscriptions() {
    this._router.navigate(['/courses/subscriptions/' + this.courseid]);

  }



  GoToCoursePage() {
    debugger
    this._router.navigate(['/courses/editcourse/' + this.courseid + '/' + 'edit']);
  }

  GoToModulesPage() {
    this._router.navigate(['/courses/addcoursemodule/' + this.courseid]);

  }

  Finish(){
    this._router.navigate(['/courses/course']);

  }
}
