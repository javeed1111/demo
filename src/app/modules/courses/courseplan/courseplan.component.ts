import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
// import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-courseplan',
  templateUrl: './courseplan.component.html',
  styleUrls: ['./courseplan.component.scss']
})
export class CourseplanComponent implements OnInit {
  // @ViewChild('comingSoonNgForm') comingSoonNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  FreeForm: FormGroup;
  showAlert: boolean = false;
  Free: boolean = false;
  Monthly: boolean = false;
  Quaterly: boolean = false;
  Yearly: boolean = false;
  cours: any;
  planId: number;
  startdate = new Date();
  EndDate = new Date();


  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    // public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.GetCourse();
    this.Freeclick();
    this.FreeForm = this._formBuilder.group({
      days: ['7', []],
      description: ['', []],
      courseId: ['', []],
    });
  }
  GetCourse() {
    debugger
    this._authService.GetCourses().subscribe((finalresult: any) => {
      debugger
      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        debugger
        //this.dataSource= finalresult.result;
        this.cours = finalresult.result;
        //this.roles = finalresult.result;
        console.log('techs', this.cours)
        //const dataSource = this.roles ;
      }
      else {

      }
    });
  }
  Freeclick() {
    this.Free = true;
    this.planId = 1;
    this.Monthly = false;
    this.Quaterly = false;
    this.Yearly = false;

  }
  Monthlyclick() {
    debugger
    this.Monthly = true;
    this.planId = 2;
    this.Free = false;
    this.Quaterly = false;
    this.Yearly = false;
  }
  Quaterlyclick() {
    this.Quaterly = true;
    this.planId = 3;
    this.Free = false;
    this.Monthly = false;
    this.Yearly = false;
  }
  Yearlyclick() {
    this.Yearly = true;
    this.planId = 4;
    this.Free = false;
    this.Monthly = false;
    this.Quaterly = false;
  }
  onChangeDemo(ob: MatCheckboxChange) {
    console.log(ob.checked + " => " + ob.source.id);
  }


  savefree(): void {
    debugger
    // Return if the form is invalid
    if (this.FreeForm.invalid) {
      return;
    }
    const freedata = this.FreeForm.getRawValue();
    var days = parseInt(freedata.days);
    this.EndDate.setDate(this.startdate.getDate() + days);
    var data = {
      EffectiveFrom: this.startdate,
      EffectiveTill: this.EndDate,
      Description: freedata.description,
      ListOfCourses: freedata.courseId,
      CreatedBy: parseInt(localStorage.getItem("LoginId")),
    }
    this._authService.AddCoursePlan(data).subscribe((result: any) => {
      //   var data = {
      //     TechnologyName: contact.technologyName,
      //     // ImageURL:
      //      CreatedBy: parseInt(localStorage.getItem("LoginId")),
      //     //  IsActive: this.active,
      //  }
      //   this._authService.Addtechnology(data).subscribe((result: any) => {
      debugger
      var result = JSON.parse(result);
      if (result.status == "200") {
        debugger

        // Show the alert
        this.showAlert = true;

        this.alert = {
          type: 'success',
          message: result.message
        };

        setTimeout(() => {
          this._router.navigate(['/courses/technology']);
        }, 1000);
      }
      else {
        this.alert = {
          type: 'error',
          message: result.error

        };
        this.showAlert = true;
      }
      (error) => {

      }
    });
  }

}
