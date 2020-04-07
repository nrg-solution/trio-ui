import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService, AuthenticationService, AlertService } from '../_services';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-paymentreport',
  templateUrl: './paymentreport.component.html',
  styleUrls: ['./paymentreport.component.css']
})
export class PaymentreportComponent implements OnInit {
  @ViewChild('paymentReport') paymentReport: ElementRef;  
  public pageName:string;     
  
  model: any = {};
  display3 = 'none';
  noreportagentinfo = 'none';
  allMemList :any = {};
  paymetable=false;
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.model.fromDate='';
    this.model.toDate='';
    this.model.payStatus='';
    this.pageName=localStorage.getItem('pageName');
  }

  onCloseHandled(){
    this.display3 = 'none'
    this.noreportagentinfo = 'none';
  }

  printToCart(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.paymentReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'paymentReport.xlsx'); 
  }
  
 getPaymentReport(){   
    let requestType ="Payment Report";
    let status="All";
    this.userService.getMemberReport(this.model.fromDate,this.model.toDate,requestType,this.model.payStatus,status)
    .subscribe(
      data => {   
          this.allMemList = data;
          if(this.allMemList.length==0){
              this.paymetable=false;
              this.noreportagentinfo="block";
          }else {
              this.paymetable=true;
          }
      },
      error => {
          this.display3="block"; 
      });  
  }

  backToReport(){
    if(this.pageName=="admindashboard") {
      this.router.navigate(['/report-menus']);
    }
    if(this.pageName=="itsupportdashboard") {
        this.router.navigate(['/report-menus']);
    }

    if(this.pageName=="financedashboard") {
        this.router.navigate(['/report-menus']);
    }
    
    if(this.pageName=="memberdashboard") {
        this.router.navigate(['/report-menus']);
    }
    
    if(this.pageName=="agentdashboard") {
        this.router.navigate(['/report-menus']);
    }

    if(this.pageName=="invmanagerempdashboard") {
      this.router.navigate(['/invmanagerempdashboard']);
    }

  }


}