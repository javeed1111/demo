import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { FuseAlertType } from '@fuse/components/alert';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  displayedColumns = ['sno',  'emailaddress','mobilenumber', 'subscriptiondate'];
  dataSource: MatTableDataSource<any>;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
  };
  showAlert:  boolean = false;
  courseid: any;

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
    this.GetReviews(this.courseid);
  }

  GetReviews(id:any){
    this._authService.GetReviews(id).subscribe((finalresult: any) => {
      //debugger
      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        //debugger
        //this.dataSource= finalresult.result;
        //this.techs= finalresult.result;
        this.dataSource = new MatTableDataSource(finalresult.result);
        
      }

  })

  }
}
