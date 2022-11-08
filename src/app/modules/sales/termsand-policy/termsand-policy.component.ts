import { Component, OnInit } from '@angular/core';


import { AfterViewInit, ChangeDetectorRef,Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
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



@Component({
  selector: 'app-termsand-policy',
  templateUrl: './termsand-policy.component.html',
  styleUrls: ['./termsand-policy.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TermsandPolicyComponent implements OnInit {
  // color = 'primary';
  // mode = 'indeterminate';
  // value = 50;
  // displayProgressSpinner = false;
  // spinnerWithoutBackdrop = false;


  // isLoading: boolean = false;
  // selectedProduct: any | null = null;
  displayedColumns = ['sno',  'Tab Name','actions'];
  dataSource: MatTableDataSource<any>;
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
  constructor( private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService,) { }

    ngOnInit(): void {
       
      this.GetTermplocydata()
       
    }
    applyFilter(filterValue: string) {
      //
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
 
 
    // closeDetails(): void
    //   {
    //       this.selectedProduct = null;
    //   }
      showEditModal(id) {
        
        var value = "edit";
        this._router.navigate(['/masters/edittermsandpolicy/' + id + '/' + value])
      }
      showViewModal(id) {
        
        var value = "view"
        this._router.navigate(['/masters/edittermsandpolicy/' + id + '/' + value])
      }
    
      createProduct(){
        //
    
        // this._router.navigate(['/userconfig/role/addrole'])
        this._router.navigate(['/masters/addtermsandpolicy'])
      }
      createProducts(){
        //
    
        // this._router.navigate(['/userconfig/role/addrole'])
        this._router.navigate(['/masters/masternavigation'])
      }
    // ngOnDestroy(): void
    // {
    //     // Unsubscribe from all subscriptions
    //     this._unsubscribeAll.next(null);
    //     this._unsubscribeAll.complete();
    // }
 
    GetTermplocydata() {
      
      this._authService.GetTermspolicy().subscribe((finalresult: any) => {
        
        if (finalresult.status == "200") {
          console.log('getcompanydtls',finalresult.result);
          this.dataSource = new MatTableDataSource(finalresult.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
  
        }
      });
    }
  
   
    deleteContent(Id: any): void {
      //
      this.showAlert = false
      // Open the confirmation dialog
      const confirmation = this._fuseConfirmationService.open({
        title: 'Delete Faculty',
        message: 'Are you sure you want to delete this Record?',
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
            Id:Id,
            UpdatedBy: parseInt(localStorage.getItem("LoginId"))
          }
  
          // Delete the contact
          this._authService.DeleteTermsPolicies(data).subscribe((data: any) => {
            
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
