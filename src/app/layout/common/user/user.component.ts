import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { AppConfig, Scheme, Theme, Themes } from 'app/core/config/app.config';
import { UserService } from 'app/core/user/user.service';
import { FuseConfigService } from '@fuse/services/config';
import { Layout } from 'app/layout/layout.types';
import { AuthService } from 'app/core/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'

    
})
export class UserComponent implements OnInit, OnDestroy
{

    config: AppConfig;
    layout: Layout;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;
    firstname:string;
    lastname:string;
    email:string;
    dataSource: MatTableDataSource<any>;
    

    // private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
    
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthService,
        private approute: ActivatedRoute
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     item: number = 0;
     subscription: any;
    ngOnInit(): void
    {
        debugger;
        var Id = this.approute.snapshot.params['Id'];
        this.firstname=localStorage.getItem("firstname");
        this.lastname=localStorage.getItem("lastname");
        this.email=localStorage.getItem("email");
        this.subscription = this._authService.getuserchangeemitter().subscribe(item =>{
        debugger;
       this.getThemeColor(item)
      });
        
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
            this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AppConfig) => {

                // Store the config
                this.config = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }



    setLayout(layout: string): void
    {
        // Clear the 'layout' query param to allow layout changes
        this._router.navigate([], {
            queryParams        : {
                layout: null
            },
            queryParamsHandling: 'merge'
        }).then(() => {

            // Set the config
            this._fuseConfigService.config = {layout};
        });
    }


    setScheme(scheme: Scheme): void
    {
        this._fuseConfigService.config = {scheme};
    }

    /**
     * Set the theme on the config
     *
     * @param theme
     */
    setTheme(theme: Theme,type): void
    {
        debugger;
        this._fuseConfigService.config = {theme};
        var Id = localStorage.getItem('LoginId');
        if(type=="yes"){
        this._authService.setThemeColor(theme,Id).subscribe((finalresult: any) => {
            debugger
            // if (finalresult.status == "200") {
              
            //   console.log('getcompanydtls',finalresult.result);
            //   this.dataSource = new MatTableDataSource(finalresult.result);
            //   // this.dataSource.paginator = this.paginator;
            //   // this.dataSource.sort = this.sort;
            // }
        //    this.setTheme(finalresult.themecolor)
            
          });
    
        }


    }

    getThemeColor(item){
        this._authService.Gettheme(item).subscribe((finalresult: any) => {
            debugger
            // if (finalresult.status == "200") {
              
            //   console.log('getcompanydtls',finalresult.result);
            //   this.dataSource = new MatTableDataSource(finalresult.result);
            //   // this.dataSource.paginator = this.paginator;
            //   // this.dataSource.sort = this.sort;
            // }
           this.setTheme(finalresult.themecolor,'no')
            
          });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void
    {
        // Return if user is not available
        if ( !this.user )
        {
            return;
        }

        // Update the user
        this._userService.update({
            ...this.user,
            status
        }).subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void
    {
        this._router.navigate(['/sign-out']);
    }
   
}
