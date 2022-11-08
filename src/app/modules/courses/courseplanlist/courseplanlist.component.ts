import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'app/core/auth/auth.service';
// import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { FuseAlertType } from '@fuse/components/alert';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
export interface CourseplanData {
  sno: string;
  planName: string;
  price: string;
  effectivefrom: string;
  effectivetill: string;
  actions:string;
}

@Component({
  selector: 'app-courseplanlist',
  templateUrl: './courseplanlist.component.html',
  styleUrls: ['./courseplanlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CourseplanlistComponent implements OnInit {
  isLoading: boolean = false;
  selectedProduct: any | null = null;
  displayedColumns = ['sno',  'planName', 'price', 'effectivefrom','effectivetill','actions'];
  dataSource: MatTableDataSource<CourseplanData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // pagination: VenturePagination;
  // dataSource: MatTableDataSource<CourseData>;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  roles: any;
  role: any;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
course: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.GetCourseplans();
  }
  applyFilter(filterValue: string) {
    //
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  closeDetails(): void
  {
      this.selectedProduct = null;
  }
  showEditModal(pcid,planid) {
    //
    var value="edit"
    this._router.navigate(['/courses/editcourseplan/'+pcid+'/'+planid+'/'+value])
  }
  showViewModal(pcid,planid) {
    //
    var value="view"
    this._router.navigate(['/courses/editcourseplan/'+pcid+'/'+planid+'/'+value])
  }
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
  createProduct(){
    this._router.navigate(['/courses/courseplan/'])
  }
  courseData :any= []
  GetCourseplans() {
    //
    this._authService.GetCourseplans().subscribe((finalresult: any) => {
      //
     var finalresult = JSON.parse(finalresult);
     
      if (finalresult.status == "200") {
        
        console.log('coursepalns',finalresult.result)
        // finalresult.result.noofchapters =0
        for(let i=0;i<finalresult.result.length;i++){
        finalresult.result[i].effectiveFrom=this.datepipe.transform(finalresult.result[i].effectiveFrom, 'dd-MM-yyyy');
        finalresult.result[i].effectiveTill=this.datepipe.transform(finalresult.result[i].effectiveTill, 'dd-MM-yyyy');
          // if(finalresult.result[i].noOfChapters==0){
          //   finalresult.result[i].duration="";
          // }
          // else{
          //   finalresult.result[i].duration=finalresult.result[i].duration+""+finalresult.result[i].units;
          // }
          // if(finalresult.result[i].fees==0){
          //   finalresult.result[i].fees="Free";
          // }
        }
        
        console.log(finalresult.result)
        
        this.dataSource = new MatTableDataSource(finalresult.result);
        // this.course= finalresult.result;
        
        //this.roles = finalresult.result;
        // console.log('techs',this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //const dataSource = this.roles ;
      }
      else {
        
      }
  });
  }
  deleteCourse(pcid,planid): void
    {
      
      this.showAlert=false
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete course',
            message: 'Are you sure you want to delete this course?',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
           var CreatedBy= parseInt(localStorage.getItem("LoginId"))
           var data={
            pcid:pcid,
            planid:planid
           }
                // Delete the courseplan
                this._authService.deletecourseplan(data).subscribe((data:any) => {
                    //
                    if (data.status == "200") {
                        
                          
                        this.alert = {
                            type   : 'success',
                            message: data.message
                        
                        };
                        this.showAlert=true
                      //  this._router.navigate(['/userconfig/role/']);
                        setTimeout(() => {
                            window.location.reload();
                        }, 0);
                        
                      }
                      else {
                        this.alert = {
                          type   : 'error',
                          message: data.message
                      
                      };
                      this.showAlert=true
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

}
