import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    baseUrl: any
    

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,private _userService: UserService){
    // this.baseUrl = 'https://localhost:44358/';
    this.baseUrl = 'http://testugetitapi.fadelsoft.com/';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
    //debugger
       token ==undefined?'': localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        //debugger
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }
    /**
     * Sign in
     *
     * 
     */
    public signIn(credentials: { mobileno: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this.baseUrl + "api/Admin/userlogin", credentials).pipe(
            switchMap((response: any) => {
                debugger

                // Store the access token in the local storage
                this.accessToken = response.result.token;
                localStorage.setItem("firstname", response.result.firstName);
                        localStorage.setItem("lastname", response.result.lastName);
                        localStorage.setItem("email", response.result.email);
                        localStorage.setItem("LoginId", response.result.id);
                        localStorage.setItem("token", response.result.token);

                // Set the authenticated flag to true
                this._authenticated = true;
                //localStorage.setItem("_authenticated",this._authenticated)
                 //var token=localStorage.setItem('accessToken', this.accessToken);

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    public Adduser(data) {
        debugger
        return this._httpClient.post(this.baseUrl + "api/Admin/CreateUser", data, {responseType: 'text'});
      }
      
      public GetUsers() {
        return this._httpClient.get(this.baseUrl + "api/Admin/GetAllusers",{responseType: 'text'});
      }
      public GetRoles() {
        return this._httpClient.get(this.baseUrl + "api/Admin/GetAllRoles",{responseType: 'text'});
      }
      public Addrole(data) {
        debugger
        return this._httpClient.post(this.baseUrl + "api/Admin/AddRole  ", data, {responseType: 'text'});
      }
      public deleteRole(id) {
        debugger
        return this._httpClient.delete(this.baseUrl + "api/Admin/DeleteRole", {params: {id}});
      }
      public Updaterole(data) {
        debugger
        return this._httpClient.post(this.baseUrl + "api/Admin/UpdateRole  ", data, {responseType: 'text'});
      }
      public GetRoleById(id) {
        debugger
        return this._httpClient.get(this.baseUrl + "api/Admin/GetRoleById", {params: {id}});
      }
      public GetTechnologies() {
          debugger
        return this._httpClient.get(this.baseUrl + "api/Admin/GetAllTechnologies",{responseType: 'text'});
      }
    //   public Addtechnology(data) {
    //     debugger
    //     return this._httpClient.post(this.baseUrl + "api/Admin/AddTechnology  ", data, {responseType: 'text'});
    //   }
      Addtechnology(formdata) {
        //debugger
        return this._httpClient.post(this.baseUrl + "api/Admin/AddTechnology", formdata, {responseType: 'text'});
      }
      public GetechnologyById(id) {
        debugger
        return this._httpClient.get(this.baseUrl + "api/Admin/GetTechnologyById", {params: {id}});
      }
      public Updatetechnology(formdata) {
        debugger
        return this._httpClient.post(this.baseUrl + "api/Admin/UpdateTechnology  ", formdata, {responseType: 'text'});
      }
      public deletetechnology(id) {
        debugger
        return this._httpClient.delete(this.baseUrl + "api/Admin/DeleteTechnology", {params: {id}});
      }
      public GetCourses() {
        debugger
      return this._httpClient.get(this.baseUrl + "api/Admin/GetAllCourses",{responseType: 'text'});
    }
    public Addcourse(formData) {
        debugger
        return this._httpClient.post(this.baseUrl + "api/Admin/AddCourses  ", formData, {responseType: 'text'});
      }
    public uploadAvatar(id, file) {
        debugger
      return this._httpClient.get(this.baseUrl + "api/Admin/GetAllCourses",{responseType: 'text'});
    }
    public GetcourseById(id) {
        debugger
        return this._httpClient.get(this.baseUrl + "api/Admin/GetCourseById", {params: {id}});
      }
    public UpdateCourse(formData) {
        debugger
        return this._httpClient.post(this.baseUrl + "api/Admin/UpdateCourse", formData, {responseType: 'text'});
      }
      public deletecourse(id) {
        debugger
        return this._httpClient.delete(this.baseUrl + "api/Admin/DeleteCourse", {params: {id}});
      }
      AddCoursePlan(data) {
        //debugger
        return this._httpClient.post(this.baseUrl + "api/Admin/AddPlanCourse", data, {responseType: 'text'});
      }
    
      

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        debugger
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        //debugger
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        //debugger
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
