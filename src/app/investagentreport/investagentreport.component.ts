import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService, AuthenticationService, AlertService } from '../_services';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-investagentreport',
  templateUrl: './investagentreport.component.html',
  styleUrls: ['./investagentreport.component.css']
})
export class InvestagentreportComponent implements OnInit {
  @ViewChild('invagentReport') invagentReport: ElementRef;  
       
  invagList :any = {};
  model: any = {};
  noreportagentinfo = 'none';
  display3 = 'none';
  invReportList :any = {};
  invreporttable=false;
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userService.getinvAgentName()
    .subscribe(
        data => {     
            this.invagList= data;
            console.log("Investment Agent List --------->"+this.invagList);
        } ,
        error => {
    });

    this.model.fromDate='';
    this.model.toDate='';
    this.model.name = '';
    this.model.empName = '';
  }

  onCloseHandled(){
    this.noreportagentinfo = 'none';
    this.display3 = 'none';
  }

  printToCart2(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.invagentReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'InvestmentAgentReport.xlsx'); 
  }
  
  getAgentInvReport(){   
    this.userService.getAllAgentInvReport(this.model.name,this.model.fromDate,this.model.toDate)
        .subscribe(
            data => {
                this.invReportList = data;
                if(this.invReportList.length==0){
                    this.invreporttable=false; 
                    this.noreportagentinfo="block";
                }else {
                    this.invreporttable=true; 
                }
            },
            error => {
                this.display3="block"; 
            }
          ); 
        
  }

}
