
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Observable } from 'rxjs';
export interface InventoryProduct
{
    id: any;
    category?: string;
    name: string;
    description?: string;
    tags?: string[];
    sku?: string | null;
    barcode?: string | null;
    brand?: string | null;
    vendor: string | null;
    stock: number;
    reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: number;
    weight: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}
export class CartItems{
  cartId:any
  courseId:any
  imageURL:any
  iconUrl:any
  courseName:any
  totalAmount:any
  totalTax:any
 
  IsPlan:any
  }
@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.scss']
})

export class StudentdetailsComponent implements OnInit {
  
  products$: Observable<InventoryProduct[]>;
  comparecount=1
  preview2: any;
  preview:any;
  preview1:any;
  showAlert1: boolean;
  newid: any;
  icon: string;
  studentdetails:any;
  name: string;
  courses: any;
  carttable: any=[];
  totalTax: any=0;
  totalAmount: any=0;
  Total: any=0;
  userId: string;
  customerId: any;
  // selectedProduct: InventoryProduct | null = null;

  constructor(    private _router: Router,private _authService: AuthService, private _changeDetectorRef: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.preview=false;
    this.preview1=false;
    this.Getstudentdetails();
    this.userId=localStorage.getItem('AzureUserId')
    // var id = this.approute.snapshot.params['id'];
    var id =localStorage.getItem("cartcourseid")

   // this.CartItems();
   
  }


  

  // CartItems(){
   
  //   var userid=localStorage.getItem('AzureUserId')
  //   this._authService.Getcourses(userid).subscribe((finalresult: any) => {
  //     debugger
  //     console.log(finalresult);
  //     // var finalresult=JSON.parse(finalresult)
  //     this.courses=finalresult.result
  //     localStorage.setItem('cartlength',this.courses.length)
  //     for(let i=0;i<this.courses.length;i++){
  //       const obj=new CartItems()
      

  //               if (this.courses[i].imageURL != null) {
  //                 obj.imageURL = this.courses[i].imageURL;
  //                 // this.noimage=true;
        
  //               }
  //               else {
  //                 obj.iconUrl="https://ugetit.blob.core.windows.net/courseimages/1997d693-1f4d-404b-a3fc-19a5fade0397-Image-2.jpg";
  //                 // this.ImageURL = baseurl + "/courseFiles/dummy identityproof.png";
        
  //               }

        
  //       obj.courseId=this.courses[i].courseId,
  //       obj.courseName= this.courses[0].courseName,
       
  //       obj.IsPlan=this.courses[i].isPlan,
  //       // obj.imageURL=this.courses[i].imageURL,
  //       obj.totalAmount=this.courses[i].totalAmount
  //       if(this.courses[i].offerPrice!=0){
  //         obj.totalAmount=this.courses[i].offerPrice

  //       }
  //       obj.totalAmount=obj.totalAmount+obj.totalTax

  //       this.carttable.push(obj)
  //       this.totalAmount=this.totalAmount+obj.totalAmount
  //       this.totalTax=this.totalTax+obj.totalTax
  //     }
  //     this.Total=this.totalAmount+this.totalTax

   
  //   });
  //   //return this.courses.length
  // }


  Getstudentdetails(){
    debugger
    this._authService.GetStudentsDetails().subscribe((finalresult: any) => {
      debugger
      //console.log(finalresult);
      //this.relatedcourses=finalresult.result;
      if (finalresult.status == "200") {
        debugger
        console.log(finalresult)
        this.studentdetails = finalresult.result;
        for (let i = 0; i < this.studentdetails.length; i++) {
          // this.courses[i].price = this.courses[i].price ;
          // this.offerprice = finalresult.result.offerPrice
          this.studentdetails[i].courses
          // this.studentdetails=finalresult.result.courseName;
        
        }
      }  
    });
  }

  createProducts(){
    //

    // this._router.navigate(['/userconfig/role/addrole'])
    this._router.navigate(['/masters/masternavigation'])
  }

  closeDetails(): void
    {
        this.newid = null;
    }
    previews(){

      this.preview=true
       this.preview1=true
       this.preview2=true
    }
  toggleDetails(customerDetails:any)
    {


  //     this.customerId=customerId;
  //     this._authService.Getcourses(this.customerId).subscribe((finalresult: any) => {
  // debugger
  //      for (let i = 0; i < this.studentdetails.length; i++) {
       
  //         // this.courses[i].price = this.courses[i].price ;
  //         // this.offerprice = finalresult.result.offerPrice
          
  //         // obj.cartId=this.courses[i].cartId,
  //         // obj.cartId=this.courses[i].cartId,
      
  //         // this.studentdetails=finalresult.result.courseName;
         
          
  //       }
    
     if(customerDetails.isVisible==undefined ||customerDetails.isVisible==null){
      customerDetails.isVisible=true;
     }
     else if(customerDetails.isVisible==true){
      customerDetails.isVisible=false
     }
     else if(customerDetails.isVisible==false){
      customerDetails.isVisible=true
     }
    
      var count =1
      if(count==this.comparecount ){
      this.preview=true;
      this.comparecount+=1;
      
    }
    else{
      this.preview=false;
      this.comparecount-=1;

    }
      // if(selectedid== this.newid){
        // this.closeDetails();
        // return;
      // }
      this._changeDetectorRef.markForCheck();
   
    }

    toggleDetails1()
    {
      var count =1
      if(count==this.comparecount){
      this.preview1=true;
      this.comparecount+=1;
    }
    else{
      this.preview1=false;
      this.comparecount-=1;

    }
      // if(selectedid== this.newid){
        // this.closeDetails();
        // return;
      // }
      this._changeDetectorRef.markForCheck();
           
    }


    toggleDetails2()
    {
      var count =1
      if(count==this.comparecount){
      this.preview2=true;
      this.comparecount+=1;
    }
    else{
      this.preview2=false;
      this.comparecount-=1;

    }
      
      this._changeDetectorRef.markForCheck();
           
    }
  
}
