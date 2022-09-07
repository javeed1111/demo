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
  selector: 'app-dashboardbanner',
  templateUrl: './dashboardbanner.component.html',
  styleUrls: ['./dashboardbanner.component.scss']
})
export class DashboardbannerComponent implements OnInit {
  displayedColumns = ['sno', 'title', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.GetBannerContent();
  }

  applyFilter(filterValue: string) {
    //debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showEditModal(id) {
    debugger
    var value = "edit";
    this._router.navigate(['/masters/editdashboardbanner/' + id + '/' + value])
  }
  showViewModal(id) {
    debugger
    var value = "view"
    this._router.navigate(['/masters/editdashboardbanner/' + id + '/' + value])
  }

  createProduct() {
  
    this._router.navigate(['/masters/adddashboardbanner'])
  }

  GetBannerContent() {
    //debugger
    this._authService.GetBannerContent().subscribe((finalresult: any) => {
      debugger
      if (finalresult.status == "200") {
        //debugger
    
        this.dataSource = new MatTableDataSource(finalresult.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {

      }
    });
  }
  deleteContent(Id: any): void {
    //debugger
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
        this._authService.deleteBannerContent(data).subscribe((data: any) => {
          debugger
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
