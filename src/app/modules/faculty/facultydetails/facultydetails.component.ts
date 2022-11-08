import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/auth/auth.service';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { FuseAlertType } from '@fuse/components/alert';


@Component({
  selector: 'app-facultydetails',
  templateUrl: './facultydetails.component.html',
  styleUrls: ['./facultydetails.component.scss']
})
export class FacultydetailsComponent implements OnInit {
  isLoading: boolean = false;
  displayedColumns = ['sno', 'facultyName', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // pagination: VenturePagination;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  roles: any;
  role: any;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  techs: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService,) { }

  ngOnInit(): void {
    this.GetFaculties();
  }
  
  applyFilter(filterValue: string) {
    //
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showEditModal(id) {
    
    var value = "edit";
    this._router.navigate(['/faculty/editfaculty/' + id + '/' + value])
  }
  showViewModal(id) {
    
    var value = "view"
    this._router.navigate(['/faculty/editfaculty/' + id + '/' + value])
  }

  createProduct() {
  
    this._router.navigate(['/faculty/addfaculty'])
  }
  GetFaculties() {
    //
    this._authService.GetFaculties().subscribe((finalresult: any) => {
      
      if (finalresult.status == "200") {
        //
        //this.dataSource= finalresult.result;
        //this.techs= finalresult.result;
        this.dataSource = new MatTableDataSource(finalresult.result);
        // console.log('techs',this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {

      }
    });
  }
  deleteFaculty(Id: any): void {
    //
    this.showAlert = false
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete Faculty',
      message: 'Are you sure you want to delete this Faculty?',
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
        var data= {
          FacultyId:Id
        }

        // Delete the contact
        this._authService.deleteFaculty(data).subscribe((data: any) => {
          
          if (data.status == "200") {
            // Set the alert
            this.alert = {
              type: 'success',
              message: data.message
            };

            // Show the alert
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false
            }, 2000);
            //  this._router.navigate(['/userconfig/role/']);
            setTimeout(() => {
              window.location.reload();
            }, 2000);

          }

          else if (data.status == "202") {
            this.alert = {
              type: 'error',
              message: data.message

            };
            this.showAlert = true
            setTimeout(() => {
              this.showAlert = false
            }, 2000);


          }
          else {
            // this.spinner.hide();
            this.alert = {
              type: 'error',
              message: "Invalid Id."

            };
            this.showAlert = true
            setTimeout(() => {
              this.showAlert = false
            }, 2000);
            // this.notifications.alert('Alert', result.message, NotificationType.Alert, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
          }

        });

      }
    });

  }

}
