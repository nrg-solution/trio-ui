import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-menus',
  templateUrl: './report-menus.component.html',
  styleUrls: ['./report-menus.component.css']
})
export class ReportMenusComponent implements OnInit {
  public reportmenu1 = false; 
  public imgsrc="assets/images/Triologo.png";
    constructor() { }
  
    ngOnInit() {
      this.reportmenu1 = true;
      this.imgsrc="assets/images/Triologo.png";
  
    }
  
}
