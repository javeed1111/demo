import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { OrderByPipe } from '../order-by.pipe';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  isLinear: boolean = false
  sortedarray: any = [];

  QuestionsForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  Save: boolean = true;
  update: boolean = false;
  Clear: boolean = false;
  show: boolean;
  displayedColumns = ['sno', 'sorting', 'question', 'actions'];
  dataSource: MatTableDataSource<any>;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
      // ['bold', 'italic', 'underline'],
      // [{align: []}, {list: 'ordered'}, {list: 'bullet'}],
      // ['clean']
    ]
  };

  showAlert: boolean = false;
  courseid: any;
  questions: any;

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    private _fuseConfirmationService: FuseConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _orderpipi: OrderByPipe

  ) { }

  ngOnInit(): void {
    debugger
    this.courseid = this.approute.snapshot.params['id'];

    this.QuestionsForm = this._formBuilder.group({
      faqId: [''],
      courseId: [''],
      courseName: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],

    });
    this.GetCourseByID();
    this.GetQuestionsByCourseId(this.courseid);
  }


  OnClickUp(id: any) {
    debugger
    let item1 = this.questions.find(i => i.orderId === id);
    let item2 = this.questions.find(i => i.orderId === (id - 1));
    if (item1.orderId > 1) {
      item1.orderId = item1.orderId - 1
      item2.orderId = item2.orderId + 1
      this.sortedarray.push(item1);
      this.sortedarray.push(item2);

      this._authService.UpdateFaqsOrderId(this.sortedarray).subscribe((result: any) => {
        debugger
        window.location.reload();
      });
    }
    else {
      return;
    }
  }

  cancel() {

    this._router.navigate(['/courses/course']);


  }

  OnClickDown(id: any) {
    debugger
    let item1 = this.questions.find(i => i.orderId === id);
    let item2 = this.questions.find(i => i.orderId === (id + 1));
    if (item1.orderId < this.questions.length && item1.orderId > 0) {
      item1.orderId = item1.orderId + 1
      item2.orderId = item2.orderId - 1
      this.sortedarray.push(item1);
      this.sortedarray.push(item2);

      this._authService.UpdateFaqsOrderId(this.sortedarray).subscribe((result: any) => {
        debugger
        window.location.reload();
      });
    }
    else {
      return;
    }
  }

  ngAfterViewInit() {
    this.stepper.selectedIndex = 3;
  }

  GetCourseByID() {
    this._authService.GetcourseById(this.courseid).subscribe((result: any) => {
      debugger
      var item = result.result
      this.QuestionsForm.controls['courseName'].setValue(item.courseName);
    });
  }
  clear() {
    this.QuestionsForm.controls['question'].setValue('');
    this.QuestionsForm.controls['answer'].setValue('');
    this.Save = true;
    this.update = false;

  }



  EditFromGrid(id: any, value: any) {
    debugger
    var baseurl = this._authService.baseUrl;
    if (baseurl == "https://localhost:44358/") {
      baseurl = "https://localhost:44358"
    }
    if (baseurl == "http://testugetitapi.fadelsoft.com/") {
      baseurl = "http://testugetitapi.fadelsoft.com"
    }
    if (value == "viewcontent") {
      this.QuestionsForm.controls['courseName'].disable();
      this.QuestionsForm.controls['question'].disable();
      this.QuestionsForm.controls['answer'].disable();

      this.Save = true;
      this.update = false;
      this.Clear = false;
    }
    else {
      this.QuestionsForm.controls['courseName'].disable();
      this.QuestionsForm.controls['question'].enable();
      this.QuestionsForm.controls['answer'].enable();

      this.Save = false;
      this.update = true;
      this.Clear = true;
    }
    this._authService.GetQuestionsById(id).subscribe((finalresult: any) => {
      debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        debugger

        this.QuestionsForm.patchValue(finalresult.result);
        const course = this.QuestionsForm.getRawValue();

      }

    });
  }
  Update(val: any) {
    debugger
    if (!this.QuestionsForm.dirty) {
      this._router.navigate(['/courses/reviews/' + this.courseid]);
    }
    else {
      this.showAlert = false;
      if (this.QuestionsForm.invalid) {

        return
        // return;
      }
      // Get the contact object
      const values = this.QuestionsForm.getRawValue();

      // Go through the contact object and clear empty values
      //  contact.emails = contact.emails.filter(email => email.email);

      //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

      //   if(this.active==undefined){
      //      this.active = true;
      //  }
      //  if(course.Duration==""){
      //    course.Duration=0
      //     }
      //     if(course.Fees==""){
      //       course.Fees=0
      //     }
      var data = {
        FaqId: values.faqId,
        CourseId: values.courseId,
        Question: values.question,
        Answer: values.answer,
        UpdateBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
      }

      this._authService.UpdateQuestion(data).subscribe((result: any) => {
        //debugger
        var result = JSON.parse(result);
        if (result.status == "200") {
          //debugger
          // Set the alert
          this.alert = {
            type: 'success',
            message: result.message
          };

          // Show the alert
          this.showAlert = true;
          if (val == 'Update') {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
          else if (val == 'UpdateNext') {
            setTimeout(() => {
              this._router.navigate(['/courses/reviews/' + this.courseid]);
            }, 3000);
          }

        }
        else {
          // Set the alert
          this.alert = {
            type: 'error',
            message: result.message
          };

          // Show the alert
          this.showAlert = true;
        }
        (error) => {

        }
      });
    }
  }
  deleteFromGrid(id: any): void {
    debugger
    this.showAlert = false
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete course',
      message: 'Are you sure you want to delete this CourseContent?',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {
        var CreatedBy = parseInt(localStorage.getItem("LoginId"))
        var data = {
          Id: id
        }
        // Delete the contact
        this._authService.DeleteQuestion(id).subscribe((data: any) => {
          //debugger
          if (data.status == "200") {


            this.alert = {
              type: 'success',
              message: data.message

            };
            this.showAlert = true
            //  this._router.navigate(['/userconfig/role/']);
            setTimeout(() => {
              window.location.reload();
            }, 0);

          }
          else {
            this.alert = {
              type: 'error',
              message: data.message

            };
            this.showAlert = true
            // this.notifications.alert('Alert', result.message, NotificationType.Alert, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
          }

          // Return if the contact wasn't deleted...
          // if ( !isDeleted )
          // {
          //     return;
          // }

          // // Navigate to the next contact if available
          // if ( nextContactId )
          // {
          //     this._router.navigate(['../', nextContactId], {relativeTo: this._activatedRoute});
          // }
          // // Otherwise, navigate to the parent
          // else
          // {
          //     this._router.navigate(['../'], {relativeTo: this._activatedRoute});
          // }

          // Toggle the edit mode off
          // this.toggleEditMode(false);
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });

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
    if (stepLabel == "Step 5") {
      this._router.navigate(['/courses/reviews/' + this.courseid]);
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

  GoToPage() {
    debugger
    var value = "edit"

    this.show = false
  }

  GoToCoursePage() {
    debugger
    this._router.navigate(['/courses/editcourse/' + this.courseid + '/' + 'edit']);
  }

  GoToModulesPage() {
    this._router.navigate(['/courses/addcoursemodule/' + this.courseid]);

  }

  GetQuestionsByCourseId(Id: any) {
    debugger
    this._authService.GetQuestions(Id).subscribe((result: any) => {
      debugger
      var values = this._orderpipi.transform(result.result, "asc", "orderId", "number");
      this.questions = values[0]

      // this.questions=result.result

      this.dataSource = new MatTableDataSource(values[0]);

    })

  }

  SaveQuestions(val: any) {
    debugger
    if (!this.QuestionsForm.dirty) {
      this._router.navigate(['/courses/reviews/'+this.courseid]);
    }
    else {
      if (this.QuestionsForm.invalid) {
        return;
      }
      const values = this.QuestionsForm.getRawValue();
      var data = {
        CourseId: this.courseid,
        Question: values.question,
        Answer: values.answer,
        CreatedBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
      }
      this._authService.AddQuestions(data).subscribe((result: any) => {
        debugger
        var result = JSON.parse(result);
        if (result.status == "200") {
          this.alert = {
            type: 'success',
            message: result.message
          };

          // Show the alert
          this.showAlert = true;
          if (val == 'Save') {
            setTimeout(() => {
              // this._router.navigate(['/courses/course']);
              window.location.reload();
            }, 3000);
          }
          else if (val == 'SaveNext') {
            setTimeout(() => {
              this._router.navigate(['/courses/reviews/' + this.courseid]);
            }, 3000);
          }

        }
        else {
          // Set the alert
          this.alert = {
            type: 'error',
            message: result.message
          };
          // Show the alert
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
        }
        (error) => {

        }
      });
    }
  }

}
