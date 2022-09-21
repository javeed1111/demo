import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;
  baseUrl: any
  

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient, private _userService: UserService) {
    this.baseUrl = 'https://localhost:44328/';
    //this.baseUrl = 'https://testugetitapi.fadelsoft.com/';
    //this.baseUrl = 'http://testugetitapi.fadelsoft.com/';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    debugger
    //localStorage.setItem('accessToken', token);
    token == undefined ? '' : localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
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
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post('api/auth/reset-password', password);
  }
  /**
   * Sign in
   *
   * 
   */
  public signIn(credentials: { mobileno: string; password: string }): Observable<any> {
    debugger
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(this.baseUrl + "api/Admin/userlogin", credentials).pipe(
      switchMap((response: any) => {
        debugger
        // if(response.status=='200'){
        // Store the access token in the local storage
        this.accessToken = response.result.token;
        localStorage.setItem("firstname", response.result.firstName);
        localStorage.setItem("lastname", response.result.lastName);
        localStorage.setItem("email", response.result.email);
        localStorage.setItem("LoginId", response.result.id);
        localStorage.setItem("token", response.result.token);
        // }

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

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this._httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/files`);
  }

  public Adduser(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/CreateUser", data, { responseType: 'text' });
  }

  public GetUsers() {
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllusers", { responseType: 'text' });
  }
  public GetRoles() {
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllRoles", { responseType: 'text' });
  }
  public Addrole(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/AddRole", data, { responseType: 'text' });
  }
  public deleteRole(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/DeleteRole", data);
  }
  public Updaterole(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateRole", data, { responseType: 'text' });
  }
  public GetRoleById(id) {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetRoleById", { params: { id } });
  }
  public GetTechnologies() {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllTechnologies", { responseType: 'text' });
  }
  //   public Addtechnology(data) {
  //     debugger
  //     return this._httpClient.post(this.baseUrl + "api/Admin/AddTechnology  ", data, {responseType: 'text'});
  //   }
  Addtechnology(formdata) {
    //debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/AddTechnology", formdata, { responseType: 'text' });
  }
  public GetechnologyById(id) {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetTechnologyById", { params: { id } });
  }
  public Updatetechnology(formdata) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateTechnology", formdata, { responseType: 'text' });
  }
  public deletetechnology(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/Removetechnology", data);
  }
  public GetCourses() {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllCourses", { responseType: 'text' });
  }
  public Addcourse(formData) {
    debugger
   
    return this._httpClient.post(this.baseUrl + "api/Admin/AddCourses", formData);

  }
  public uploadAvatar(id, file) {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllCourses", { responseType: 'text' });
  }
  public GetcourseById(id) {
    //debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetCourseById", { params: { id } });
  }
  public UpdateCourse(formData) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateCourse", formData, { responseType: 'text' });
  }
  public deletecourse(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/DeleteCourse", data);
  }
  AddCoursePlan(data): Observable<any> {
    //debugger
    //return;
    return this._httpClient.post(this.baseUrl + "api/Admin/AddPlanCourse", data, { responseType: 'text' });
  }
  public deletecourseplan(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/DeletePlanCourse", data);
  }
  UpdateCoursePlan(data): Observable<any> {
    //debugger
    // return;
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdatePlanCourse", data);
  }
  public GetPlanmasters() {
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllPlanMaster", { responseType: 'text' });
  }
  public GetPlanmastersById(id) {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetPlanMasterById", { params: { id } });
  }
  // yet to implement
  public GettitleById(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/GetTitleById", data);
  }
  //end yet

  public gridcoursecontentbycourseid(id) {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/Getcoursecontentbycourseid", { params: { id } });
  }
  public GetCoursechapters() {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllCoursechapters", { responseType: 'text' });
  }
  public GetcoursecontentById(id) {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/Getcoursecontentbyid", { params: { id } });
  }
  Addcoursecontent(formdata): Observable<any> {
    //debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/Addcoursecontent", formdata);
  }
  Updatecoursecontent(data) {
    //debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/Updatecoursecontent", data, { responseType: 'text' });
  }
  Updatecoursecontentvideo(data) {
    //debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/Updatecoursecontentvideo", data);
  }
  public deletecoursecontent(data) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/Deletecoursecontent", data);
  }
  public GetCourseContent() {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetCourseContent", { responseType: 'text' });
  }
  public GetCourseplans() {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllPlanCourse", { responseType: 'text' });
  }
  public GetcourseplanById(pcid, planid) {
    //debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetPlanCourseById?pcid=" + pcid + "&planid=" + planid);
  }
  public GetallcoursefeeById(id) {
    //debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllCourseFeeById", { params: { id } });
  }
  public GetAllInActivePlanFees(id) {
    //debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllInActivePlanFees", { params: { id } });
  }
  public GetCourseModules(Id: any) {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetCourseModulesByCourseId?Id=" + Id, { responseType: 'text' });
  }

  AddCourseModules(data: any) {
    return this._httpClient.post(this.baseUrl + "api/Admin/AddCourseModules", data, { responseType: 'text' });

  }
  GetCourseModulesById(id: any) {
    return this._httpClient.get(this.baseUrl + "api/Admin/GetCourseModulesById", { params: { id } });

  }

  UpdateCourseModules(data: any) {
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateCourseModules", data, { responseType: 'text' });

  }
  DeleteCourseModule(data: any) {
    return this._httpClient.post(this.baseUrl + "api/Admin/DeleteCourseModules", data);
  }

  public GetReviews(id):Observable<any> {
    debugger
    return this._httpClient.get(this.baseUrl + "api/UIMain/GetReviewsByCourseId?Id="+id );
  }
  AddQuestions(data) {
    //debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/AddFaqs", data, { responseType: 'text' });
  }
  GetQuestions(Id: any) {
    return this._httpClient.get(this.baseUrl + "api/Admin/GetFaqsByCourseId", { params: { Id } });

  }
  GetQuestionsById(Id: any) {
    return this._httpClient.get(this.baseUrl + "api/Admin/GetFaqsById", { params: { Id } });

  }
  UpdateQuestion(data: any) {
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateFaqs", data, { responseType: 'text' });

  }
  DeleteQuestion(id: any) {
    return this._httpClient.delete(this.baseUrl + "api/Admin/DeleteFaqs?id=" + id);
  }
  UpdateOrderId(data: any) {
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateOrderId", data, { responseType: 'text' });

  }
  UpdateCourseContentOrderId(data: any) {
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateCourseContentOrderId", data, { responseType: 'text' });

  }
  UpdateFaqsOrderId(data: any) {
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateFaqsOrderId", data, { responseType: 'text' });

  }

  public GetFaculties():Observable<any> {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetAllFaculties");
  }
  AddFaculty(formdata):Observable<any> {
    //debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/AddFaculty", formdata);
  }
  public GetFacultyById(id):Observable<any> {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetFacultyById?Id="+id);
  }
  public UpdateFaculty(formdata):Observable<any> {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateFaculty", formdata);
  }
  public deleteFaculty(data):Observable<any> {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/RemoveFaculty", data);
  }

  public GetBannerContent():Observable<any> {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetBannerContent");
  }
  AddBannerContent(data):Observable<any> {
    //debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/AddBannerContent", data);
  }
  public GetBannerContentById(id):Observable<any> {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetBannerContentById?Id="+id);
  }
  public UpdateBannerContent(data):Observable<any> {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateBannerContent", data);
  }
  public deleteBannerContent(data):Observable<any> {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/DeleteBannerContent", data);
  }
  public GetInvoiceNoFormat():Observable<any> {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetInvoiceNoFormat");
  }
  AddInvoiceNoFormat(data):Observable<any> {
    //debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/AddInvoiceNoFormat", data);
  }
  public GetInvoiceNoFormatById(id):Observable<any> {
    debugger
    return this._httpClient.get(this.baseUrl + "api/Admin/GetInvoiceNoFormatById?Id="+id);
  }
  public UpdateInvoiceNoFormat(data):Observable<any> {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/UpdateInvoiceNoFormat", data);
  }
  public deleteInvoiceNoFormat(data):Observable<any> {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/DeleteInvoiceNoFormat", data);
  }
  public UploadVideo(formData) {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/UploadVideo", formData);
  }
  public DeleteVideo(fileName:string):Observable<any> {
    debugger
    return this._httpClient.delete(this.baseUrl + "api/Admin/DeleteVideo?fileName="+fileName);
  }
  public UploadChapterVideo(formData) {
    debugger
    // return this._httpClient.post(this.baseUrl + "api/Admin/UploadChapterVideo", formData);
    return this._httpClient.post(this.baseUrl + "api/Admin/UploadChapterVideo", formData,{
      reportProgress:true,
      observe:'events'
    });


  }
  public DeleteChapterVideo(fileName:string):Observable<any> {
    debugger
    return this._httpClient.delete(this.baseUrl + "api/Admin/DeleteChapterVideo?fileName="+fileName);
  }
  public DeleteFiles(data:any):Observable<any> {
    debugger
    return this._httpClient.post(this.baseUrl + "api/Admin/DeleteFiles",data);
  }
  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
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
  signOut(): Observable<any> {
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
  signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    //debugger
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
}
