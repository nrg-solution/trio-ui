import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService, AuthenticationService, AlertService } from '../_services';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-partnerreport',
  templateUrl: './partnerreport.component.html',
  styleUrls: ['./partnerreport.component.css']
})
export class PartnerreportComponent implements OnInit {
  @ViewChild('partnerReport') partnerReport: ElementRef;  
       
  agList :any = {};
  empList :any = {};
  model: any = {};
  allMemList :any = {};

  noreportagentinfo = 'none';
  display3 = 'none';
  employeereporttable=false;
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
    this.model.status='';
  }

  onCloseHandled(){
    this.noreportagentinfo = 'none';
    this.display3 = 'none';
  }

  printToCart(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.partnerReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'partnerReport.xlsx'); 
  }
  
  getMemberReport(){   
    let requestType ="Member Report";
    let payStatus = "All";
    this.userService.getMemberReport(this.model.fromDate,this.model.toDate,requestType,payStatus,this.model.status)
    .subscribe(
      data => {
          this.allMemList = data;
          if(this.allMemList.length==0){
              this.employeereporttable=false;
              this.noreportagentinfo="block";
          }else {
              this.employeereporttable=true;
          }
      },
      error => {
          this.display3="block"; 
      });  
        
  }

}