import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService, AuthenticationService, AlertService } from '../_services';
import *  as  XLSX from 'xlsx';

@Component({
  selector: 'app-employeereport',
  templateUrl: './employeereport.component.html',
  styleUrls: ['./employeereport.component.css']
})
export class EmployeereportComponent implements OnInit {
  @ViewChild('employeeReport') employeeReport: ElementRef;  
       
  model: any = {};
  noreportagentinfo = 'none';
  display3 = 'none';
  employeeList :any = {};
  emptable=false;
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
    this.model.empRole='';
  }

  onCloseHandled(){
    this.noreportagentinfo = 'none';
    this.display3 = 'none';
  }

  printToCart(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.employeeReport.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
      XLSX.writeFile(wb, 'employeeReport.xlsx'); 
  }
  
  getEmployeeReport(){   
    this.userService.getEmployeeReport(this.model.fromDate,this.model.toDate,this.model.empRole)
    .subscribe(
      data => {
          this.employeeList = data;
          if(this.employeeList.length==0){
              this.emptable=false;
              this.noreportagentinfo="block";
          }else {
              this.emptable=true;
          }
      },
      error => {
          this.display3="block"; 
      }); 
  }

}