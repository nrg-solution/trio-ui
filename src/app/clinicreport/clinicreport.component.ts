import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService, AuthenticationService, AlertService } from '../_services';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-clinicreport',
  templateUrl: './clinicreport.component.html',
  styleUrls: ['./clinicreport.component.css']
})
export class ClinicreportComponent implements OnInit {
  @ViewChild('clinicReport') clinicReport: ElementRef;  
  public pageName:string;

  agList :any = {};
  empList :any = {};
  model: any = {};
  display3 = 'none';
  noreportagentinfo = 'none';
  clinicReportList :any = {};
  clinictable=false;
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.pageName=localStorage.getItem('pageName');

    this.userService.getAgentName()
    .subscribe(
    data => {
        this.agList= data;
        console.log("Agent List --------->"+this.agList);
    } ,
    error => {
    });

    let empRole = 'All';
    this.userService.getEmployeeName(empRole)
    .subscribe(
        data => {
            this.empList= data;
            console.log("Employee List -------->"+this.empList);
        } ,
        error => {
    }); 

    this.model.fromDate='';
    this.model.toDate='';
    this.model.name = '';
    this.model.empName = '';
  }

  onCloseHandled(){
      this.display3 = 'none';
      this.noreportagentinfo = 'none';
  }

  printToCart(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.clinicReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'clinicReport.xlsx'); 
  }
  
  getMemberClinicReport(){   
    this.userService.getMemberClinicReport(this.model.fromDate,this.model.toDate,this.model.name,
      this.model.empName)
  .subscribe(
    data => {
        this.clinicReportList = data;
        if(this.clinicReportList.length==0){
            this.clinictable=false;
            this.noreportagentinfo="block";
        }else {
            this.clinictable=true;
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

    if(this.pageName=="employeedashboard") {
      this.router.navigate(['/employeedashboard']);
    }

  }

}
