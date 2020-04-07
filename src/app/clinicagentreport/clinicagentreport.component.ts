import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService, AuthenticationService, AlertService } from '../_services';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-clinicagentreport',
  templateUrl: './clinicagentreport.component.html',
  styleUrls: ['./clinicagentreport.component.css']
})
export class ClinicagentreportComponent implements OnInit {
  @ViewChild('clinicagReport') clinicagReport: ElementRef;  
     
  
  agList :any = {};
  model: any = {};
  display3 = 'none';
  noreportagentinfo = 'none';
  clinicReportList :any = {};
  clinicagreporttable=false;
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userService.getAgentName()
    .subscribe(
      data => {     
          this.agList= data;
          console.log("Clinic Agent List --------->"+this.agList);
      } ,
      error => {
      });                   

      this.model.name='';
	    this.model.fromDate='';
	    this.model.toDate='';
  }

  onCloseHandled(){
    this.display3 = 'none';
    this.noreportagentinfo = 'none';
  }

  printToCart1(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.clinicagReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'clinicAgentReport.xlsx'); 
  }
  
  getAgentClinicReport(){   
    this.userService.getAgentClinicReport(this.model.name,this.model.fromDate,this.model.toDate)
    .subscribe(
      data => {
          this.clinicReportList = data;
          if(this.clinicReportList.length==0){
            this.clinicagreporttable=false;
            this.noreportagentinfo="block";
 
          }else {
            this.clinicagreporttable=true;     
          }
      },
      error => {
        this.display3="block"; 
      });   
        
  }

}
